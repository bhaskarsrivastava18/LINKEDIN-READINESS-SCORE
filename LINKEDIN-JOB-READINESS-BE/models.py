from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from db import Base
class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    headline = Column(String)
    score = Column(Integer)
    breakdown = Column(JSON)
    tips = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())