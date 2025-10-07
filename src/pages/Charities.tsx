import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Charities() {
  const [charities, setCharities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharities = async () => {
      const { data, error } = await supabase
        .from("charities")
        .select("*")
        .limit(50);

      if (error) console.error("Error fetching charities:", error);
      else setCharities(data || []);

      setLoading(false);
    };

    fetchCharities();
  }, []);

  if (loading) return <p>Loading charities...</p>;

  return (
    <div>
      <h1>Charities List</h1>
      <ul>
        {charities.map((charity) => (
          <li key={charity.organisation_number}>
            <strong>{charity.charity_name}</strong> — {charity.charity_activities}
          </li>
        ))}
      </ul>
    </div>
  );
}
