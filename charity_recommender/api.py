from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from charity_recommender.recommender import recommend_charities

app = FastAPI()

# Allow your front-end origin(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
        "http://localhost:3000",   # Next dev
        "https://your-prod-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendRequest(BaseModel):
    query: str

class Charity(BaseModel):
    organisation_number: int
    charity_name: str
    charity_activities: str

class RecommendResponse(BaseModel):
    recommendations: List[Charity]

@app.get("/")
def read_root():
    return {"message": "Welcome to the Charity Recommender API!"}

@app.post("/recommend", response_model=RecommendResponse)
def recommend(request: RecommendRequest):
    try:
        recommendations = recommend_charities(request.query)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# To run: uvicorn charity_recommender.api:app --reload
# To test: 
# curl -X POST "http://localhost:8000/recommend" -H "Content-Type: application/json" -d '{"query": "clothing for homeless"}'