import pandas as pd
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
import json

# Load CSV
df = pd.read_csv("./cleaned_charity_data.csv")

# Clean Data
df_clean = df[['organisation_number', 'charity_name', 'charity_activities']].dropna(subset=['charity_activities'])

# Generate Embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')
charity_activities_list = df_clean['charity_activities'].fillna('').tolist()
charity_embeddings = model.encode(charity_activities_list, show_progress_bar=True)

# FAISS Index
embedding_dimension = charity_embeddings.shape[1]
index = faiss.IndexFlatL2(embedding_dimension)
index.add(charity_embeddings)

# Save FAISS index
faiss.write_index(index, "charity_faiss.index")

# Save mapping from index to charity info
mapping = df_clean[['organisation_number', 'charity_name', 'charity_activities']].to_dict(orient='records')
with open("charity_faiss_mapping.json", "w") as f:
    json.dump(mapping, f)

print("✅ FAISS index and mapping saved.")
