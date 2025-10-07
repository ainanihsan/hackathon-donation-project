// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import path from "path";
// import csv from "csv-parser";

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // === STEP 1: Define SDG Phrases (context-rich natural language) ===
// const sdgPhrases = {
//   "SDG 1: No Poverty": [
//     "reduce poverty", "fight poverty", "helping the homeless", "income equality", "affordable housing"
//   ],
//   "SDG 2: Zero Hunger": [
//     "fight hunger", "food security", "reduce malnutrition", "provide food aid"
//   ],
//   "SDG 3: Good Health and Well-being": [
//     "improve healthcare access", "mental health", "disease prevention", "medical assistance"
//   ],
//   "SDG 4: Quality Education": [
//     "access to education", "school support", "teacher training", "improve literacy", "education for children"
//   ],
//   "SDG 5: Gender Equality": [
//     "women empowerment", "gender equality", "girls education", "equal opportunities for women"
//   ],
//   "SDG 6: Clean Water and Sanitation": [
//     "clean water access", "sanitation facilities", "safe drinking water", "hygiene programs"
//   ],
//   "SDG 7: Affordable and Clean Energy": [
//     "renewable energy", "solar power", "sustainable electricity", "clean energy access"
//   ],
//   "SDG 8: Decent Work and Economic Growth": [
//     "create job opportunities", "economic growth", "skills training", "entrepreneurship"
//   ],
//   "SDG 9: Industry, Innovation and Infrastructure": [
//     "technological innovation", "sustainable infrastructure", "research and development"
//   ],
//   "SDG 10: Reduced Inequalities": [
//     "social inclusion", "support marginalized groups", "reduce inequality", "equal rights"
//   ],
//   "SDG 11: Sustainable Cities and Communities": [
//     "urban development", "affordable housing", "sustainable transport", "community resilience"
//   ],
//   "SDG 12: Responsible Consumption and Production": [
//     "reduce waste", "recycling", "sustainable production", "eco-friendly consumption"
//   ],
//   "SDG 13: Climate Action": [
//     "fight climate change", "reduce carbon emissions", "environmental sustainability", "reforestation"
//   ],
//   "SDG 14: Life Below Water": [
//     "protect marine life", "ocean conservation", "reduce plastic pollution", "coastal protection"
//   ],
//   "SDG 15: Life on Land": [
//     "forest conservation", "biodiversity", "wildlife protection", "habitat restoration"
//   ],
//   "SDG 16: Peace, Justice and Strong Institutions": [
//     "promote peace", "justice reform", "human rights advocacy", "anti corruption"
//   ],
//   "SDG 17: Partnerships for the Goals": [
//     "global partnerships", "collaboration", "international cooperation", "support local ngos"
//   ]
// };

// // === STEP 2: Load CSV data ===
// let charities = [];
// const csvFilePath = path.join(process.cwd(), "charity_recommender", "cleaned_charity_data.csv");

// fs.createReadStream(csvFilePath)
//   .pipe(csv())
//   .on("headers", (headers) => console.log("📄 Charity dataset headers:", headers))
//   .on("data", (row) => charities.push(row))
//   .on("end", () => console.log("✅ Charity dataset loaded:", charities.length, "rows"));

// // === STEP 3: Helper - Detect SDGs in text ===
// function detectSDGs(text) {
//   const lowerText = (text || "").toLowerCase();
//   const matched = [];

//   for (const [sdg, phrases] of Object.entries(sdgPhrases)) {
//     if (phrases.some((phrase) => lowerText.includes(phrase.toLowerCase()))) {
//       matched.push(sdg);
//     }
//   }

//   return matched;
// }

// // === STEP 4: Search API (now supports full-sentence queries) ===
// app.get("/api/searchCharities", (req, res) => {
//   const query = req.query.query?.toLowerCase().trim();
//   if (!query) return res.status(400).json({ error: "Query parameter is required" });

//   const results = charities
//     .map((charity) => {
//       const name = charity["charity_name"]?.toLowerCase() || "";
//       const activities = charity["charity_activities"]?.toLowerCase() || "";

//       // Combine charity description + user query
//       const combinedText = `${activities} ${name} ${query}`;
//       const matchedSDGs = detectSDGs(combinedText);
//       const impactScore = matchedSDGs.length * 6; // Each SDG adds to impact

//       return {
//         organisation_number: charity["organisation_number"],
//         charity_name: charity["charity_name"],
//         charity_activities: charity["charity_activities"],
//         matched_sdgs: matchedSDGs,
//         impact_score: Math.min(impactScore, 100)
//       };
//     })
//     .filter(
//       (c) =>
//         c.charity_name.toLowerCase().includes(query) ||
//         c.charity_activities.toLowerCase().includes(query) ||
//         c.matched_sdgs.length > 0
//     )
//     .sort((a, b) => b.impact_score - a.impact_score)
//     .slice(0, 15);

//   if (results.length === 0) return res.json({ message: "No charities found matching your query." });

//   res.json(results);
// });

// // === STEP 5: Start the server ===
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// });
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// === SDG Phrases ===
const sdgPhrases = {
  "SDG 1: No Poverty": [
    "reduce poverty",
    "income support",
    "housing for poor",
    "financial inclusion",
    "employment opportunities"
  ],
  "SDG 2: Zero Hunger": [
    "food security",
    "zero hunger",
    "nutrition support",
    "agriculture improvement",
    "famine relief"
  ],
  "SDG 3: Good Health and Well-being": [
    "health care",
    "mental health support",
    "disease prevention",
    "well-being programs"
  ]
};

// === Load CSV Data ===
let charities = [];
const csvFilePath = path.join(process.cwd(), "charity_recommender", "cleaned_charity_data.csv");

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("headers", (headers) => {
    console.log("📄 Charity dataset headers:", headers);
  })
  .on("data", (row) => {
    charities.push(row);
  })
  .on("end", () => {
    console.log("✅ Charity dataset loaded:", charities.length, "rows");
  });

// === Detect SDGs ===
function detectSDGs(activityText) {
  const text = (activityText || "").toLowerCase();
  const matchedSDGs = [];

  for (const [sdg, phrases] of Object.entries(sdgPhrases)) {
    if (phrases.some((phrase) => text.includes(phrase))) {
      matchedSDGs.push(sdg);
    }
  }
  return matchedSDGs;
}

// === Heatmap Color ===
function getHeatmapColor(score) {
  const red = Math.floor(255 - score * 2.55);
  const green = Math.floor(score * 2.55);
  return `rgb(${red}, ${green}, 0)`;
}

// === API Endpoint ===
app.get("/api/searchCharities", (req, res) => {
  const query = req.query.query?.toLowerCase().trim();
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const results = charities
    .map((charity) => {
      const sdgs = detectSDGs(charity.charity_activities);

      let impactScore = sdgs.length * 6;

      // Boost SDG 1 & 2
      if (sdgs.includes("SDG 1: No Poverty")) impactScore += 10;
      if (sdgs.includes("SDG 2: Zero Hunger")) impactScore += 10;

      impactScore = Math.min(impactScore, 100);

      return {
        organisation_number: charity.organisation_number,
        charity_name: charity.charity_name,
        charity_activities: charity.charity_activities,
        sdgs,
        impact_score: impactScore,
        heat_color: getHeatmapColor(impactScore)
      };
    })
    .filter((charity) =>
      charity.charity_name.toLowerCase().includes(query) ||
      charity.charity_activities.toLowerCase().includes(query)
    )
    .sort((a, b) => b.impact_score - a.impact_score)
    .slice(0, 20);

  if (results.length === 0) {
    return res.json({ message: "No charities found matching your query." });
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
