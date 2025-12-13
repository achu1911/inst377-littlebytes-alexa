import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("favorites").select("*");
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { recipe_id, recipe_name, image } = req.body;

    if (!recipe_id || !recipe_name) {
      return res.status(400).json({ error: "missing fields" });
    }

    const { error } = await supabase.from("favorites").insert([
      { recipe_id, recipe_name, image }
    ]);

    if (error) return res.status(500).json({ error });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
