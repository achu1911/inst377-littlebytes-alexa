export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Recipe ID required" });
    }

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();

    if (!data.meals) {
      return res.status(200).json(null);
    }

    return res.status(200).json(data.meals[0]);
  } catch (err) {
    console.error("Recipe API error:", err);
    return res.status(500).json({ error: "Failed to fetch recipe" });
  }
}
