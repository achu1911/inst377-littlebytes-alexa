import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // GET favorites
  if (req.method === "GET") {
    const { data, error } = await supabase.from("favorites").select("*");
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  // POST favorite
  if (req.method === "POST") {
    const { recipe_id, recipe_name, image } = req.body;
    if (!recipe_id || !recipe_name) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { error } = await supabase.from("favorites").insert([
      { recipe_id, recipe_name, image },
    ]);

    if (error) return res.status(500).json({ error });
    return res.status(200).json({ success: true });
  }

  // DELETE favorite  🔥 THIS IS THE FIX
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID required" });
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Delete failed" });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
