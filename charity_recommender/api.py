
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from charity_recommender.recommender import recommend_charities


app = FastAPI()

# Allow all origins for development; restrict in production as needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendRequest(BaseModel):
    query: str
    num_recommendations: int = 3

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