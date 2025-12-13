import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: "Delete failed" });
  }

  return res.status(200).json({ success: true });
}
