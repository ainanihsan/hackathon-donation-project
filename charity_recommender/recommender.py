
import numpy as np
import faiss
import json
from sentence_transformers import SentenceTransformer

# Load FAISS index and mapping
INDEX_PATH = "charity_faiss.index"
MAPPING_PATH = "charity_faiss_mapping.json"

index = faiss.read_index(INDEX_PATH)
with open(MAPPING_PATH, "r") as f:
    mapping = json.load(f)

model = SentenceTransformer('all-MiniLM-L6-v2')

def recommend_charities(query, num_recommendations=5):
    query_embedding = model.encode(query)
    query_embedding = np.array([query_embedding])
    distances, indices = index.search(query_embedding, num_recommendations)

    recommendations = []
    for i in range(num_recommendations):
        charity_index = indices[0][i]
        distance = distances[0][i]
        charity_info = mapping[charity_index]
        recommendations.append({
            'organisation_number': charity_info['organisation_number'],
            'charity_name': charity_info['charity_name'],
            'charity_activities': charity_info['charity_activities'],
            'similarity_distance': float(distance)
        })
    return recommendations

# Example usage for debugging
if __name__ == "__main__":
    results = recommend_charities("charities for veterans", num_recommendations=5)
    for r in results:
        print(r)