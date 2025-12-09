import { useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const removeIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const searchRecipes = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);

    const query = ingredients.join(",");
    const response = await fetch(`http://localhost:3001/api/recipes?ingredients=${query}`);
    const data = await response.json();

    setRecipes(data.meals || []);
    setLoading(false);
  };

  return (
    <div className="p-10 text-parisWine">
      <h1 className="text-5xl font-script font-bold text-parisWine mb-3">
        Find Recipes 🥘✨
      </h1>
      <p className="text-xl mb-8 max-w-xl">
        Enter ingredients you have, and LittleBytes will suggest delicious meals!
      </p>

      {/* Ingredient input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="e.g., chicken, onion, garlic..."
          className="border border-parisLavender rounded-lg px-4 py-2 md:w-96"
        />
        <button
          onClick={addIngredient}
          className="bg-parisLavender text-white px-6 py-2 rounded-lg hover:bg-parisBlue transition"
        >
          Add
        </button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {ingredients.map((item) => (
          <span
            key={item}
            className="bg-parisRose text-parisWine px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow"
          >
            {item}
            <button
              onClick={() => removeIngredient(item)}
              className="font-bold hover:text-parisLavender"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Search button */}
      <button
        onClick={searchRecipes}
        className="bg-parisWine text-white px-8 py-3 rounded-lg shadow hover:bg-parisLavender transition"
      >
        Search Recipes 🍽️
      </button>

      {/* Results */}
      <div className="mt-12">
        <h2 className="text-3xl font-cafe mb-6">Suggested Recipes</h2>

        {loading && (
          <div className="text-xl italic opacity-60">Whisking up recipes... 🥐</div>
        )}

        {!loading && recipes.length === 0 && (
          <div className="text-parisWine opacity-60 italic">
            No recipes yet — try searching above! 🥖
          </div>
        )}

        {/* Recipe cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
