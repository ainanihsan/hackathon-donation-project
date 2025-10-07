
import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// === API Endpoint: Use recommender.py ===
app.get("/api/searchCharities", (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  // Call recommender.py with the query
  const pythonProcess = spawn("./venv/bin/python", [
    "./charity_recommender/recommender.py",
    query
  ]);

  let data = "";
  let error = "";

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    error += chunk.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0 || error) {
      console.error("Python error:", error);
      return res.status(500).json({ error: "Error from recommender.py", details: error });
    }
    try {
      const recommendations = JSON.parse(data);
      res.json(recommendations);
    } catch (e) {
      console.error("JSON parse error:", e, data);
      res.status(500).json({ error: "Failed to parse recommender output", details: data });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
