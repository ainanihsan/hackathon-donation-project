"use client";
import { useState } from "react";

export default function CharitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/searchCharities?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      setResults(data?.message ? [] : data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search charities..."
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      <ul className="mt-4">
        {results.length > 0 ? (
          results.map((charity, index) => (
            <li key={index} className="border-b py-2">
              <strong>{charity.charity_name}</strong>
              <p>{charity.charity_activities}</p>
            </li>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul>
    </div>
  );
}

