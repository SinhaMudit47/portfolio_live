#!/usr/bin/env python3
"""
Backend API tests for Mudit Sinha Portfolio
Tests all /api endpoints at the public REACT_APP_BACKEND_URL
"""
import requests
import os
from dotenv import load_dotenv
from pathlib import Path
from pymongo import MongoClient
import time

# Load frontend .env to get public URL
frontend_env = Path("/app/frontend/.env")
load_dotenv(frontend_env)
BACKEND_URL = os.environ.get("REACT_APP_BACKEND_URL", "")
API_BASE = f"{BACKEND_URL}/api"

# Load backend .env for MongoDB access
backend_env = Path("/app/backend/.env")
load_dotenv(backend_env)
MONGO_URL = os.environ.get("MONGO_URL", "")
DB_NAME = os.environ.get("DB_NAME", "")

print(f"Testing backend at: {API_BASE}")
print(f"MongoDB: {MONGO_URL} / {DB_NAME}")
print("=" * 80)

# MongoDB client for persistence checks
mongo_client = MongoClient(MONGO_URL)
db = mongo_client[DB_NAME]
contact_collection = db.contact_messages


def test_root_health():
    """Test GET /api/ - root health endpoint"""
    print("\n[TEST 1] GET /api/ - root health endpoint")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "message" in data, "Response missing 'message' field"
        assert data["message"] == "Mudit Sinha Portfolio API", f"Unexpected message: {data['message']}"
        
        print("  ✅ PASSED: Root health endpoint working")
        return True
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False


def test_contact_post_happy_path():
    """Test POST /api/contact with valid payload"""
    print("\n[TEST 2] POST /api/contact - happy path (valid payload)")
    
    payload = {
        "name": "Test Reviewer",
        "email": "reviewer@example.com",
        "subject": "Backend test",
        "message": "Hello Mudit, this is an automated backend test."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=payload, timeout=15)
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.json()}")
        
        assert response.status_code == 201, f"Expected 201, got {response.status_code}"
        data = response.json()
        
        # Check response fields
        assert "id" in data, "Response missing 'id' field"
        assert "created_at" in data, "Response missing 'created_at' field"
        assert "email_delivered" in data, "Response missing 'email_delivered' field"
        
        # Validate UUID format
        assert len(data["id"]) == 36, f"Invalid UUID format: {data['id']}"
        
        # Check MongoDB persistence
        time.sleep(0.5)  # Brief delay for DB write
        doc = contact_collection.find_one({"id": data["id"]})
        assert doc is not None, f"Message {data['id']} not found in MongoDB"
        assert doc["name"] == payload["name"], "Name mismatch in DB"
        assert doc["email"] == payload["email"], "Email mismatch in DB"
        assert doc["subject"] == payload["subject"], "Subject mismatch in DB"
        assert doc["message"] == payload["message"], "Message mismatch in DB"
        assert "created_at" in doc, "created_at missing in DB"
        assert "email_delivered" in doc, "email_delivered missing in DB"
        
        print(f"  ✅ PASSED: Message saved to DB with id={data['id']}")
        print(f"  Email delivered: {data['email_delivered']}")
        
        if not data["email_delivered"]:
            print(f"  ⚠️  WARNING: email_delivered=false (check email_error in DB)")
            if "email_error" in doc and doc["email_error"]:
                print(f"      Email error: {doc['email_error']}")
        
        return True, data["id"]
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False, None


def test_contact_post_no_subject():
    """Test POST /api/contact with subject omitted (optional field)"""
    print("\n[TEST 3] POST /api/contact - subject omitted (optional)")
    
    payload = {
        "name": "Jane Smith",
        "email": "jane.smith@example.org",
        "message": "Testing without subject field."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=payload, timeout=15)
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.json()}")
        
        assert response.status_code == 201, f"Expected 201, got {response.status_code}"
        data = response.json()
        assert "id" in data, "Response missing 'id' field"
        
        # Check DB
        time.sleep(0.5)
        doc = contact_collection.find_one({"id": data["id"]})
        assert doc is not None, f"Message {data['id']} not found in MongoDB"
        assert doc["subject"] == "", "Subject should be empty string when omitted"
        
        print(f"  ✅ PASSED: Message saved without subject (id={data['id']})")
        return True, data["id"]
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False, None


def test_contact_post_validation_missing_message():
    """Test POST /api/contact - missing required 'message' field"""
    print("\n[TEST 4] POST /api/contact - validation: missing 'message'")
    
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "subject": "Test"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.text[:200]}")
        
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print("  ✅ PASSED: Validation error for missing 'message'")
        return True
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False


def test_contact_post_validation_missing_name():
    """Test POST /api/contact - missing required 'name' field"""
    print("\n[TEST 5] POST /api/contact - validation: missing 'name'")
    
    payload = {
        "email": "test@example.com",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.text[:200]}")
        
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print("  ✅ PASSED: Validation error for missing 'name'")
        return True
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False


def test_contact_post_validation_invalid_email():
    """Test POST /api/contact - invalid email format"""
    print("\n[TEST 6] POST /api/contact - validation: invalid email")
    
    payload = {
        "name": "Test User",
        "email": "not-an-email",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.text[:200]}")
        
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print("  ✅ PASSED: Validation error for invalid email")
        return True
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False


def test_contact_post_validation_message_too_long():
    """Test POST /api/contact - message exceeds 5000 chars"""
    print("\n[TEST 7] POST /api/contact - validation: message > 5000 chars")
    
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "x" * 5001  # 5001 characters
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.text[:200]}")
        
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print("  ✅ PASSED: Validation error for message > 5000 chars")
        return True
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False


def test_contact_get_list(expected_ids):
    """Test GET /api/contact - list last 50 messages"""
    print("\n[TEST 8] GET /api/contact - list messages")
    
    try:
        response = requests.get(f"{API_BASE}/contact", timeout=10)
        print(f"  Status: {response.status_code}")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        assert isinstance(data, list), f"Expected list, got {type(data)}"
        print(f"  Total messages: {len(data)}")
        
        if len(data) > 0:
            # Check first message has required fields
            msg = data[0]
            required_fields = ["id", "name", "email", "subject", "message", "created_at", "email_delivered"]
            for field in required_fields:
                assert field in msg, f"Message missing field: {field}"
            
            print(f"  Sample message fields: {list(msg.keys())}")
            
            # Verify our test messages are present
            message_ids = [m["id"] for m in data]
            for expected_id in expected_ids:
                if expected_id:
                    assert expected_id in message_ids, f"Expected message {expected_id} not found in list"
                    print(f"  ✅ Found test message: {expected_id}")
        
        print("  ✅ PASSED: GET /api/contact returns valid message list")
        return True
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False


def test_cors():
    """Test CORS headers"""
    print("\n[TEST 9] CORS - check allow_origins=*")
    
    try:
        headers = {"Origin": "https://example.com"}
        response = requests.options(f"{API_BASE}/contact", headers=headers, timeout=10)
        print(f"  Status: {response.status_code}")
        print(f"  CORS headers: {dict(response.headers)}")
        
        # Check for CORS headers
        cors_origin = response.headers.get("access-control-allow-origin", "")
        print(f"  Access-Control-Allow-Origin: {cors_origin}")
        
        # With allow_origins=["*"], we expect "*" or the requesting origin
        assert cors_origin in ["*", "https://example.com"], f"Unexpected CORS origin: {cors_origin}"
        
        print("  ✅ PASSED: CORS configured correctly")
        return True
    except Exception as e:
        print(f"  ❌ FAILED: {e}")
        return False


def main():
    """Run all tests"""
    print("\n" + "=" * 80)
    print("BACKEND API TEST SUITE - Mudit Sinha Portfolio")
    print("=" * 80)
    
    results = []
    test_message_ids = []
    
    # Test 1: Root health
    results.append(("GET /api/", test_root_health()))
    
    # Test 2: POST contact happy path
    success, msg_id = test_contact_post_happy_path()
    results.append(("POST /api/contact (happy path)", success))
    if msg_id:
        test_message_ids.append(msg_id)
    
    # Test 3: POST contact without subject
    success, msg_id = test_contact_post_no_subject()
    results.append(("POST /api/contact (no subject)", success))
    if msg_id:
        test_message_ids.append(msg_id)
    
    # Test 4-7: Validation tests
    results.append(("POST /api/contact (missing message)", test_contact_post_validation_missing_message()))
    results.append(("POST /api/contact (missing name)", test_contact_post_validation_missing_name()))
    results.append(("POST /api/contact (invalid email)", test_contact_post_validation_invalid_email()))
    results.append(("POST /api/contact (message too long)", test_contact_post_validation_message_too_long()))
    
    # Test 8: GET contact list
    results.append(("GET /api/contact", test_contact_get_list(test_message_ids)))
    
    # Test 9: CORS
    results.append(("CORS check", test_cors()))
    
    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("=" * 80)
    
    return passed == total


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
