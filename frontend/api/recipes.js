// Serverless API route to search recipes by ingredients
// Uses TheMealDB and finds recipes that match ALL ingredients

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { ingredients } = req.query;

    if (!ingredients) {
      return res.status(400).json({ error: "ingredients required" });
    }

    const list = ingredients.split(",").map(i => i.trim());
    let results = [];

    for (const ingredient of list) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      results.push(data.meals || []);
    }

    if (!results[0]?.length) {
      return res.status(200).json({ meals: [] });
    }

    const intersection = results.reduce((a, b) =>
      a.filter(x => b.some(y => y.idMeal === x.idMeal))
    );

    return res.status(200).json({ meals: intersection });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
}
