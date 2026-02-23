An AI-powered full-stack web application that analyzes a user's LinkedIn-style profile and provides a Job Readiness Score (0–100) along with visual skill breakdown, actionable improvement tips, report history tracking, and downloadable PDF reports.

This system helps students and job-seekers understand how strong their profile is for tech roles and what exactly to improve to become job-ready.

🎯 Problem Statement

Many students and freshers struggle with:

Understanding how strong their profile is for job/internship roles

Identifying gaps in skills, experience, and communication

Knowing what recruiters expect

Structuring their LinkedIn or resume profile effectively

Manual feedback is:

Inconsistent

Time-consuming

Not always personalized

✔️ This project solves the problem by:

Providing instant AI-powered feedback on:

Technical readiness

Communication clarity

Experience quality

Education alignment

Along with:

Clear improvement suggestions

Score visualization

Report history

Downloadable PDF reports

🧠 What the System Does

Users can:

Enter their skills, experience, education, interests

Get an AI-generated Job Readiness Score

View category-wise breakdown using charts

Receive personalized tips

Save reports to database

View historical progress

Download PDF reports

🏗️ System Architecture
React (Frontend)
   |
   |  HTTP Requests (Axios)
   |
FastAPI (Backend)
   |
   |  LLM Prompt + Validation
   |
OpenRouter (LLM API Gateway)
   |
   |  Model Inference (Mistral 7B)
   |
PostgreSQL (Reports Storage)
🧰 Tech Stack
Layer	Technology
Frontend	React, Vite, TailwindCSS, Material UI
Charts	Recharts
PDF Export	jsPDF
Backend	FastAPI (Python)
Database	PostgreSQL
ORM	SQLAlchemy
LLM API	OpenRouter
Model	Mistral 7B Instruct
HTTP Client	Axios
🤖 Why I Chose OpenRouter (Important Explanation)
❌ Why Not Use OpenAI Directly?

Requires credit card billing

Costly for student experimentation

Limited flexibility in switching models

✅ Why OpenRouter?

OpenRouter acts as an API gateway to multiple LLM providers, giving:

Advantage	Explanation
Multiple Models	Can switch between Mistral, LLaMA, Mixtral, Claude, etc
Cost Control	Choose cheaper models like Mistral for development
No Vendor Lock-in	Can swap model without changing backend logic
Unified API	Same API format for all LLM providers
Student Friendly	No need to commit to one expensive provider
Future-Proof	Easy to upgrade model quality later
🧠 Architectural Benefit

The backend is model-agnostic:

"model": "mistralai/mistral-7b-instruct"

Later can switch to:

"model": "meta-llama/llama-3-70b-instruct"

✔️ No frontend changes
✔️ No API redesign
✔️ No database changes

This is industry-grade AI system design.

🧠 How AI Scoring Works (Internals)

The backend sends this structured prompt to the LLM:

Analyze the LinkedIn profile and return JSON with:
- score (0–100)
- breakdown (Technical, Communication, Experience, Education)
- tips (3 actionable tips)
Example AI Output:
{
  "score": 75,
  "breakdown": {
    "Technical": 80,
    "Communication": 60,
    "Experience": 70,
    "Education": 65
  },
  "tips": [
    "Add 2 real-world projects with metrics",
    "Improve headline with role-focused keywords",
    "Showcase GitHub links in experience section"
  ]
}

This structured output is parsed and rendered into:

Charts

Lists

PDF reports

Database records

📊 Features
✔️ Profile Scoring

AI-generated Job Readiness Score (0–100)

✔️ Visual Analytics

Bar chart showing:

Technical

Communication

Experience

Education

✔️ Personalized Tips

Actionable improvement suggestions

✔️ Save Reports

Stores results in PostgreSQL for history tracking

✔️ Report History

View past analysis results

✔️ PDF Export

Download AI-generated reports

✔️ Structured Input

Education enums and controlled skill inputs improve AI reliability

🗃️ Database Schema
reports (
  id SERIAL PRIMARY KEY,
  headline TEXT,
  score INT,
  breakdown JSONB,
  tips JSONB,
  created_at TIMESTAMP
)
🧪 API Endpoints
Method	Endpoint	Purpose
POST	/analyze	Send profile to AI
POST	/reports	Save report
GET	/reports	Fetch history
🖥️ Screenshots

Profile form modal

Score visualization chart

Saved reports list

PDF export preview

(Add screenshots here in GitHub)

🛠️ Setup Instructions
Backend
cd LINKEDIN-JOB-READINESS-BE
python -m venv venv
venv\Scripts\activate
pip install -r deps.py
uvicorn main:app --reload
Frontend
cd LINKEDIN-JOB-READINESS-FE
npm install
npm run dev
📈 Future Improvements

User authentication (login)

Resume upload & parsing

JD matching score

Skill gap analytics

Career roadmap generation

Radar charts

Shareable public profile links

🎓 Academic Value

This project demonstrates:

✔️ Full-stack development
✔️ API integration
✔️ AI system design
✔️ Prompt engineering
✔️ Structured output parsing
✔️ Data visualization
✔️ Real-world use case
✔️ Production architecture thinking

🏁 Conclusion

This project bridges the gap between:

❌ “I don’t know how strong my profile is”
and
✅ “I know exactly what to improve to become job-ready.”

It transforms vague career advice into actionable AI-driven insights.

🙌 Author

Bhaskar Srivastava
B.Tech Computer Science
AI / ML | Full Stack | FastAPI | React
