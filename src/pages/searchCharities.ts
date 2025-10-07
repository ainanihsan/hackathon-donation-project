import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

type Charity = {
  name: string;
  description: string;
  location: string;
  sector: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query is required" });
  }

  const charities: Charity[] = [];
  const filePath = path.join(process.cwd(), "cleaned_charity_data.csv");

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      charities.push({
        name: row["name"] || "",
        description: row["description"] || "",
        location: row["location"] || "",
        sector: row["sector"] || "",
      });
    })
    .on("end", () => {
      // Simple keyword search
      const keyword = query.toLowerCase();
      const results = charities.filter(
        (c) =>
          c.name.toLowerCase().includes(keyword) ||
          c.description.toLowerCase().includes(keyword) ||
          c.sector.toLowerCase().includes(keyword)
      );
      res.status(200).json(results);
    })
    .on("error", (err) => {
      res.status(500).json({ error: err.message });
    });
}
