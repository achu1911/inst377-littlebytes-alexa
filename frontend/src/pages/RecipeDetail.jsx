import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(`/api/recipe/${id}`);
      const data = await response.json();
      setMeal(data);
      setLoading(false);
    }
    fetchMeal();
  }, [id]);

  if (loading)
    return (
      <div className="p-16 text-center text-xl italic text-parisWine opacity-70">
        Stirring the pot... 🍲✨
      </div>
    );

  if (!meal)
    return (
      <div className="p-16 text-center text-red-600">
        Recipe not found
      </div>
    );

  // Build ingredient list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push({ ingredient: ing, measure: meas });
    }
  }

  // Save favorite
  async function saveFavorite() {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: meal.idMeal,
        recipe_name: meal.strMeal,
        image: meal.strMealThumb,
      }),
    });

    if (res.ok) {
      alert("Added to Favorites!");
    } else {
      alert("Error saving favorite.");
    }
  }

  return (
    <div className="p-10 flex justify-center">
      <div className="max-w-5xl w-full bg-parisCream/50 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-parisRose">

        {/* Back link */}
        <Link
          to="/recipes"
          className="text-parisBlue underline hover:text-parisLavender"
        >
          ← Back to Recipes
        </Link>

        {/* Title */}
        <h1 className="text-7xl font-script text-parisWine mt-4 mb-10 tracking-wide text-center">
          {meal.strMeal}
        </h1>

        {/* Save Button */}
        <div className="text-center mb-10">
          <button
            onClick={saveFavorite}
            className="bg-parisWine text-white px-8 py-3 rounded-full shadow-lg hover:bg-parisLavender transition text-xl"
          >
            Save to Favorites
          </button>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-14 items-start">

          <div className="flex justify-center">
            <div className="relative">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-3xl shadow-xl border-[6px] border-parisRose/40 mx-auto"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded-xl shadow text-parisWine text-sm">
                {meal.strCategory} • {meal.strArea}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center text-parisWine leading-relaxed space-y-5">
            <p className="text-xl">
              Bon appétit! This cozy Parisian-style recipe brings magic to your kitchen ✨
            </p>

            <div className="w-full h-1 bg-parisRose/30 rounded-full"></div>

            <p className="italic opacity-80">
              “Anyone can cook.” — Chef Gusteau 👨🏻‍🍳
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-10 justify-center">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "ingredients"
                ? "bg-parisLavender text-white shadow"
                : "bg-white text-parisWine border border-parisLavender hover:bg-parisLavender/20"
            }`}
            onClick={() => setActiveTab("ingredients")}
          >
            🥖 Ingredients
          </button>

          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "instructions"
                ? "bg-parisLavender text-white shadow"
                : "bg-white text-parisWine border border-parisLavender hover:bg-parisLavender/20"
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            🍽️ Instructions
          </button>
        </div>

        {/* Ingredient List */}
        {activeTab === "ingredients" && (
          <div className="space-y-3 text-lg max-w-3xl mx-auto">
            <ul className="list-disc pl-6 space-y-2">
              {ingredients.map((item, i) => (
                <li key={i}>
                  <span className="font-semibold">{item.ingredient}</span> —{" "}
                  <span className="opacity-70">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {activeTab === "instructions" && (
          <div className="space-y-6 text-lg leading-relaxed max-w-3xl mx-auto">
            {meal.strInstructions
              .replace(/\r?\n/g, " ")
              .split(/(?<=\.)\s+/)
              .filter((s) => s.trim() !== "")
              .map((step, i) => (
                <div
                  key={i}
                  className="bg-white/70 p-5 rounded-2xl shadow border border-parisRose/30 flex gap-4"
                >
                  <span className="text-parisWine font-bold text-xl mt-1">
                    {i + 1}.
                  </span>
                  <p className="flex-1 break-words">{step}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
