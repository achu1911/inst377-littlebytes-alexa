import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Search recipes
app.get("/api/recipes", async (req, res) => {
  try {
    const ingredients = req.query.ingredients;
    if (!ingredients) {
      return res.status(400).json({ error: "ingredients required" });
    }

    const list = ingredients.split(",");
    let results = [];

    for (const i of list) {
      const r = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`
      );
      const d = await r.json();
      results.push(d.meals || []);
    }

    if (!results[0]?.length) return res.json({ meals: [] });

    const intersection = results.reduce((a, b) =>
      a.filter((x) => b.some((y) => y.idMeal === x.idMeal))
    );

    res.json({ meals: intersection });
  } catch (e) {
    res.status(500).json({ error: "failed" });
  }
});


app.get("/api/favorites", async (_, res) => {
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post("/api/favorites", async (req, res) => {
  const { recipe_id, recipe_name, image } = req.body;
  const { error } = await supabase
    .from("favorites")
    .insert([{ recipe_id, recipe_name, image }]);

  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

app.delete("/api/favorites/:id", async (req, res) => {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

export default app;
