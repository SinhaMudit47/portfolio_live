from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, constr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Resend config
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
CONTACT_TO_EMAIL = os.environ.get("CONTACT_TO_EMAIL", "muditsinha4899@gmail.com")
CONTACT_FROM_EMAIL = os.environ.get(
    "CONTACT_FROM_EMAIL", "Mudit Portfolio <onboarding@resend.dev>"
)
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app
app = FastAPI(title="Mudit Sinha Portfolio API")

# Router with /api prefix (required by Kubernetes ingress)
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)


# ------------------------- Models -------------------------
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: constr(strip_whitespace=True, min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[constr(strip_whitespace=True, max_length=200)] = ""
    message: constr(strip_whitespace=True, min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    id: str
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str
    created_at: datetime
    email_delivered: bool = False
    email_error: Optional[str] = None


class ContactCreateResponse(BaseModel):
    id: str
    created_at: datetime
    email_delivered: bool


# ------------------------- Helpers -------------------------
def _build_email_html(payload: ContactCreate) -> str:
    safe_subject = payload.subject or f"New message from {payload.name}"
    # Newlines -> <br/>, escape minimal HTML
    body = (
        payload.message.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\n", "<br/>")
    )
    return f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0a0a0c; color:#f3eede; padding: 32px;">
      <div style="max-width: 600px; margin: 0 auto; background: #111114; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px;">
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.25em; color: #d4a574; text-transform: uppercase; margin: 0 0 12px;">Portfolio &mdash; New Message</p>
        <h1 style="font-size: 22px; font-weight: 500; color: #fafaf7; margin: 0 0 18px;">{safe_subject}</h1>
        <table style="width:100%; font-size: 14px; line-height:1.7; color: #d6d2c3; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color:#a8a59a; width: 80px;">From</td>
            <td style="padding: 6px 0;">{payload.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color:#a8a59a;">Email</td>
            <td style="padding: 6px 0;"><a href="mailto:{payload.email}" style="color:#e8c98a; text-decoration:none;">{payload.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color:#a8a59a;">Subject</td>
            <td style="padding: 6px 0;">{payload.subject or '(none)'}</td>
          </tr>
        </table>
        <hr style="border:none; border-top:1px solid rgba(255,255,255,0.08); margin: 22px 0;" />
        <div style="font-size: 14.5px; line-height: 1.8; color:#e8e4d6; white-space: pre-wrap;">{body}</div>
        <hr style="border:none; border-top:1px solid rgba(255,255,255,0.08); margin: 22px 0;" />
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color:#7a766b; margin: 0;">Sent from your portfolio contact form &middot; reply directly to this email to respond.</p>
      </div>
    </div>
    """.strip()


async def _send_email(payload: ContactCreate) -> tuple[bool, Optional[str]]:
    """Send email via Resend. Returns (delivered, error)."""
    if not RESEND_API_KEY:
        return False, "RESEND_API_KEY not configured"
    try:
        params = {
            "from": CONTACT_FROM_EMAIL,
            "to": [CONTACT_TO_EMAIL],
            "reply_to": payload.email,
            "subject": f"[Portfolio] {payload.subject or f'New message from {payload.name}'}",
            "html": _build_email_html(payload),
        }
        # resend.Emails.send is synchronous; that is fine for low-volume contact form
        result = resend.Emails.send(params)
        if isinstance(result, dict) and result.get("id"):
            return True, None
        return False, f"Unexpected Resend response: {result}"
    except Exception as e:  # noqa: BLE001
        logger.exception("Resend email send failed")
        return False, str(e)


# ------------------------- Routes -------------------------
@api_router.get("/")
async def root():
    return {"message": "Mudit Sinha Portfolio API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.dict())
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**d) for d in docs]


@api_router.post(
    "/contact",
    response_model=ContactCreateResponse,
    status_code=201,
)
async def create_contact_message(payload: ContactCreate):
    delivered, err = await _send_email(payload)

    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject or "",
        "message": payload.message,
        "created_at": datetime.now(timezone.utc),
        "email_delivered": delivered,
        "email_error": err,
    }

    try:
        await db.contact_messages.insert_one(doc)
    except Exception:  # noqa: BLE001
        logger.exception("Failed to persist contact message")
        raise HTTPException(status_code=500, detail="Could not save message")

    return ContactCreateResponse(
        id=doc["id"], created_at=doc["created_at"], email_delivered=delivered
    )


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    docs = (
        await db.contact_messages.find()
        .sort("created_at", -1)
        .to_list(50)
    )
    out: List[ContactMessage] = []
    for d in docs:
        d.pop("_id", None)
        out.append(ContactMessage(**d))
    return out


# ------------------------- App wiring -------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
