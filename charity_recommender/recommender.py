import pandas as pd
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
from supabase import create_client, Client
import os

# Supabase credentials
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load CSV
df = pd.read_csv("./cleaned_charity_data.csv")

# Clean Data
df_clean = df[['organisation_number', 'charity_name', 'charity_activities']].dropna(subset=['charity_activities'])

print("✅ Data loaded:", df_clean.shape)

# Generate Embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')
charity_activities_list = df_clean['charity_activities'].fillna('').tolist()
charity_embeddings = model.encode(charity_activities_list, show_progress_bar=True)

print("✅ Embeddings generated:", charity_embeddings.shape)

# FAISS Index
embedding_dimension = charity_embeddings.shape[1]
index = faiss.IndexFlatL2(embedding_dimension)
index.add(charity_embeddings)
print("✅ FAISS index built:", index.ntotal)

# Recommendation function
def recommend_charities(query, num_recommendations=5):
    query_embedding = model.encode(query)
    query_embedding = np.array([query_embedding])
    distances, indices = index.search(query_embedding, num_recommendations)

    recommendations = []
    for i in range(num_recommendations):
        charity_index = indices[0][i]
        distance = distances[0][i]
        charity_info = df_clean.iloc[charity_index]
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
v