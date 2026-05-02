#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build a professional dynamic portfolio website for Mudit Sinha (GenAI Engineer)
  based on his resume and LinkedIn profile. Wire backend for the Contact form to
  send real emails via Resend and persist messages in MongoDB.

backend:
  - task: "POST /api/contact - submit contact message and send email via Resend"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: |
            Implemented POST /api/contact endpoint. Validates payload via
            Pydantic ContactCreate (name 1-120, EmailStr email, subject<=200,
            message 1-5000). Persists doc to MongoDB collection
            contact_messages with id (uuid), name, email, subject, message,
            created_at (UTC tz-aware), email_delivered, email_error.
            Sends email via Resend using onboarding@resend.dev (free domain)
            to muditsinha4899@gmail.com with the visitor's email as Reply-To.
            Returns 201 with {id, created_at, email_delivered}.
            If Resend fails, message is still saved and email_delivered=false.
        - working: true
          agent: "testing"
          comment: |
            ✅ ALL TESTS PASSED (9/9)
            Tested at public URL: https://interview-ready-61.preview.emergentagent.com/api
            
            Happy path tests:
            - POST /api/contact with valid payload → 201 with {id, created_at, email_delivered: true}
            - Message persisted to MongoDB collection contact_messages with all required fields
            - Email successfully delivered via Resend (email_delivered: true)
            - POST /api/contact with subject omitted → 201 (subject is optional, defaults to empty string)
            
            Validation tests (all return 422 as expected):
            - Missing required field 'message' → 422
            - Missing required field 'name' → 422
            - Invalid email format → 422
            - Message exceeds 5000 chars → 422
            
            MongoDB persistence verified:
            - Documents contain: id (uuid), name, email, subject, message, created_at, email_delivered, email_error
            - created_at is UTC timezone-aware
            - email_delivered=true, email_error=None for successful sends
            
            CORS: Access-Control-Allow-Origin: * configured correctly
            Backend logs: No errors, all requests handled properly

  - task: "GET /api/contact - list last 50 contact messages"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: |
            Returns up to 50 most recent messages from contact_messages
            sorted by created_at desc.
        - working: true
          agent: "testing"
          comment: |
            ✅ PASSED
            - GET /api/contact returns 200 with array of messages
            - Messages sorted by created_at descending (newest first)
            - Each message contains all required fields: id, name, email, subject, message, created_at, email_delivered, email_error
            - Test messages from POST tests successfully retrieved
            - Limit of 50 messages enforced by backend

  - task: "GET /api/ - root health endpoint"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Renamed message string. Existing /api/status endpoints kept."
        - working: true
          agent: "testing"
          comment: |
            ✅ PASSED
            - GET /api/ returns 200 with {"message": "Mudit Sinha Portfolio API"}
            - Health check endpoint working correctly

frontend:
  - task: "Portfolio frontend (Hero, About, Experience, Projects, Skills, Education, Achievements, Contact, Footer)"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/Portfolio.jsx"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Frontend will only be tested if user explicitly asks."

  - task: "Contact form posts to /api/contact"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/portfolio/Contact.jsx"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: |
            Replaced localStorage mock with axios.post to
            ${REACT_APP_BACKEND_URL}/api/contact. Shows success/failure
            toasts based on email_delivered flag. Frontend will only be
            tested if user explicitly approves.

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus:
    - "POST /api/contact - submit contact message and send email via Resend"
    - "GET /api/contact - list last 50 contact messages"
    - "GET /api/ - root health endpoint"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: |
        Contact form backend wired with Resend (onboarding@resend.dev free
        domain). RESEND_API_KEY is set in backend/.env. Recipient is
        muditsinha4899@gmail.com.
        Please test:
          1. POST /api/contact with valid payload -> expect 201 with
             email_delivered: true and a row in MongoDB collection
             contact_messages.
          2. POST /api/contact with invalid email / missing fields ->
             expect 422 validation error.
          3. POST /api/contact with very long message (>5000 chars) ->
             expect 422.
          4. GET /api/contact -> expect array of messages, newest first,
             max 50.
          5. GET /api/ -> health response.
        Note on Resend free domain: the API will only successfully deliver
        to the email address that registered the Resend account
        (muditsinha4899@gmail.com). Treat that as expected behavior.
    - agent: "testing"
      message: |
        ✅ BACKEND TESTING COMPLETE - ALL TESTS PASSED (9/9)
        
        Tested all three backend endpoints at public URL:
        https://interview-ready-61.preview.emergentagent.com/api
        
        Results:
        1. GET /api/ → ✅ Returns correct health message
        2. POST /api/contact (happy path) → ✅ 201, email_delivered: true, MongoDB persistence verified
        3. POST /api/contact (no subject) → ✅ 201, optional field handled correctly
        4. POST /api/contact validations → ✅ All return 422 as expected:
           - Missing 'message' field
           - Missing 'name' field
           - Invalid email format
           - Message > 5000 chars
        5. GET /api/contact → ✅ Returns array with all required fields, sorted correctly
        6. CORS → ✅ Configured with allow_origins=["*"]
        
        MongoDB verification:
        - All messages persisted to contact_messages collection
        - All required fields present: id, name, email, subject, message, created_at, email_delivered, email_error
        - Resend email integration working (email_delivered: true)
        
        Backend logs: Clean, no errors
        
        All backend functionality is working correctly. Ready for production.
