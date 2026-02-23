from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import Depends
from models import Report
from deps import get_db
from db import engine, Base
import os
import requests
import json
import re
app = FastAPI()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
class ProfileInput(BaseModel):
    headline: str
    skills: str
    experience: str
    education: str
def extract_json(text: str) -> str:
    text = text.strip()
    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)
    return text.strip()

@app.post("/analyze")
def analyze_profile(data: ProfileInput):
    prompt = f"""
Return ONLY valid JSON. Do not include backticks, markdown, or explanation.

{{
  "score": number,
  "breakdown": {{
    "Technical": number,
    "Communication": number,
    "Experience": number,
    "Education": number
  }},
  "tips": [
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ]
}}

Profile:
Headline: {data.headline}
Skills: {data.skills}
Experience: {data.experience}
Education: {data.education}
"""
    res = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.1,
        },
        timeout=60,
    )
    raw = res.json()["choices"][0]["message"]["content"]
    clean = raw.strip()
    clean = re.sub(r"```json|```", "", clean)

    try:
        parsed = json.loads(clean)
        return parsed
    except Exception as e:
        print("LLM RAW:", raw)
        print("PARSE FAIL:", e)
        return {
            "score": 70,
            "breakdown": {
                "Technical": 70,
                "Communication": 60,
                "Experience": 65,
                "Education": 60,
            },
            "tips": [
                "Add measurable impact to projects",
                "Include GitHub links",
                "Make headline more role-specific",
            ],
        }
@app.post("/reports")
def save_report(payload: dict, db: Session = Depends(get_db)):
    report = Report(
        headline=payload.get("headline"),
        score=payload.get("score"),
        breakdown=payload.get("breakdown"),
        tips=payload.get("tips"),
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return {"message": "Report saved", "id": report.id}
@app.get("/reports")
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.created_at.desc()).all()
    return reports
@app.get("/")
def root():
    return {
        "status": "FastAPI + PostgreSQL running",
        "openrouter_key_loaded": bool(OPENROUTER_API_KEY)
    }