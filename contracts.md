# API Contracts — Mudit Sinha Portfolio

## Scope
Phase 2 wires the backend for the **Contact form only**. All other sections
(Hero, About, Experience, Projects, Skills, Education, Achievements) remain
frontend-only, sourced from `/app/frontend/src/mock/data.js`. That data lives in the
frontend because it is static portfolio content that should be editable by
Mudit without a DB round-trip.

---

## 1. What currently uses mock data (stays in frontend)
File: `/app/frontend/src/mock/data.js`
- `profile`, `stats`, `experiences`, `projects`, `skills`, `education`,
  `achievements`, `navLinks`

No backend is needed for these.

---

## 2. What gets wired to backend
**Only the Contact form submission** in
`/app/frontend/src/components/portfolio/Contact.jsx`.

Currently (mock): form saves to `localStorage` key `ms_messages`.
After integration: form POSTs to backend → backend persists to MongoDB → backend
sends an email to Mudit via Resend → frontend shows success toast.

---

## 3. Backend endpoints (prefix `/api`)

### POST /api/contact
Submit a contact message.

Request body (JSON):
```json
{
  "name": "Jane Doe",
  "email": "jane@acme.com",
  "subject": "Opportunity at Acme",    // optional
  "message": "Hi Mudit, ..."
}
```

Validation:
- `name`: required, 1–120 chars
- `email`: required, valid email
- `subject`: optional, 0–200 chars
- `message`: required, 1–5000 chars

Response 201:
```json
{
  "id": "uuid",
  "created_at": "2026-05-01T10:23:00Z",
  "email_delivered": true
}
```

Side effects:
1. Store document in MongoDB collection `contact_messages` with fields:
   `{ id, name, email, subject, message, created_at, email_delivered, email_error }`
2. Send email via Resend:
   - From: `Portfolio <onboarding@resend.dev>`
   - To: `muditsinha4899@gmail.com`
   - Reply-To: submitter's email
   - Subject: `[Portfolio] {subject or "New message from <name>"}`
   - HTML body with name, email, subject, message.
3. If Resend call fails, still return 201 with `email_delivered: false` (message
   is safely persisted in DB so nothing is lost).

### GET /api/contact (optional, no auth — private use)
Returns list of last 50 messages. Intended for Mudit to browse messages
without leaving the app. Can be removed or protected later.

Response 200:
```json
[
  { "id": "...", "name": "...", "email": "...", "subject": "...",
    "message": "...", "created_at": "...", "email_delivered": true }
]
```

---

## 4. Env vars (backend/.env)
- `MONGO_URL`        — existing
- `DB_NAME`          — existing
- `RESEND_API_KEY`   — **new** (Resend API key)
- `CONTACT_TO_EMAIL` — recipient (default `muditsinha4899@gmail.com`)
- `CONTACT_FROM_EMAIL` — sender (`onboarding@resend.dev` while using Resend's test domain; swap after domain verification)

## 5. Frontend integration changes
File: `/app/frontend/src/components/portfolio/Contact.jsx`
- Replace the `setTimeout` + `localStorage` mock with an `axios.post` to
  `${REACT_APP_BACKEND_URL}/api/contact`.
- On success: clear form + success toast.
- On network failure: error toast, keep form values.
- Remove `localStorage` usage.

## 6. Notes on Resend default domain
While using `onboarding@resend.dev`, Resend only allows sending to the email
address that registered the account. That works here because we are sending
to `muditsinha4899@gmail.com` (the account owner). To accept messages for
any recipient, verify a custom domain in Resend later and change
`CONTACT_FROM_EMAIL`.
