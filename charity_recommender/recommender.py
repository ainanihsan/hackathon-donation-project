
import numpy as np
import faiss
import json
from sentence_transformers import SentenceTransformer

# Load FAISS index and mapping
index_path = "charity_faiss.index"
INDEX = faiss.read_index(index_path)

mapping_path = "charity_faiss_mapping.json"
with open(mapping_path, "r") as f:
    MAPPING = json.load(f)

MODEL = SentenceTransformer('all-MiniLM-L6-v2')

def recommend_charities(query, n_recommendations=5):
    query_embedding = MODEL.encode(query)
    query_embedding = np.array([query_embedding])
    distances, indices = INDEX.search(query_embedding, n_recommendations)

    recommendations = []
    for i in range(n_recommendations):
        charity_index = indices[0][i]
        distance = distances[0][i]
        charity_info = MAPPING[charity_index]
        recommendations.append({
            'organisation_number': charity_info['organisation_number'],
            'charity_name': charity_info['charity_name'],
            'charity_activities': charity_info['charity_activities'],
            'similarity_distance': float(distance)
        })
    return recommendations

# Example usage
# recommend_charities("clothing and food", n_recommendations=5)