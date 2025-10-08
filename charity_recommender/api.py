from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from charity_recommender.recommender import recommend_charities

app = FastAPI()

class RecommendRequest(BaseModel):
    query: str
    num_recommendations: int

@app.get("/")
def read_root():
    return {"message": "Welcome to the Charity Recommender API!"}

@app.post("/recommend")
def recommend(request: RecommendRequest):
    try:
        results = recommend_charities(request.query, request.num_recommendations)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
