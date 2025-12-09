import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

// Searching for multiple ingredients
app.get("/api/recipes", async (req, res) => {
  try {
    const ingredientList = req.query.ingredients;

    if (!ingredientList) {
      return res
        .status(400)
        .json({ error: "Ingredients query parameter is required." });
    }

    const ingredients = ingredientList.split(",").map((i) => i.trim());
    let results = [];

    for (const ingredient of ingredients) {
      const apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      console.log("Fetching:", apiURL);

      const response = await fetch(apiURL);
      const data = await response.json();
      results.push(data.meals || []);
    }

    if (results[0].length === 0) {
      return res.json({ meals: [] });
    }

    let intersection = results.reduce((acc, list) => {
      const ids = list.map((meal) => meal.idMeal);
      return acc.filter((meal) => ids.includes(meal.idMeal));
    }, results[0]);

    res.json({ meals: intersection });
  } catch (error) {
    console.error("MULTI-INGREDIENT ERROR:", error);
    res.status(500).json({ error: "Server error fetching recipes." });
  }
});

//  Getting favorite recipes
app.get("/api/favorites", async (req, res) => {
  const { data, error } = await supabase.from("favorites").select("*");

  if (error) return res.status(500).json({ error });
  res.json({ favorites: data });
});

// Post favoirte
app.post("/api/favorites", async (req, res) => {
  const { recipe_id, recipe_name, image } = req.body; 

  if (!recipe_id || !recipe_name) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const { data, error } = await supabase.from("favorites").insert([
    {
      recipe_id,
      recipe_name,
      image,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: "Failed to save favorite." });
  }

  res.json({ message: "Favorite saved!", favorite: data });
});

// Removing favorite recipes
app.delete("/api/favorites/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    return res.status(500).json({ error: "Failed to delete favorite." });
  }

  res.json({ message: "Favorite removed." });
});

// Get full recipe details 
app.get("/api/recipe/:id", async (req, res) => {
  try {
    const mealId = req.params.id;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );

    const data = await response.json();

    res.json({ meal: data.meals ? data.meals[0] : null });
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res.status(500).json({ error: "Failed to fetch recipe details." });
  }
});

app.get("/", (req, res) => {
  res.send("LittleBytes backend is running!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`LittleBytes backend running on port ${PORT}`)
);
