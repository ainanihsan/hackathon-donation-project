import { supabase } from "./supabaseClient.js";

async function getCharities() {
  const { data, error } = await supabase
    .from("charities")
    .select("*");

  if (error) {
    console.error("Error fetching charities:", error);
  } else {
    console.log("Charities:", data);
  }
}

getCharities();
