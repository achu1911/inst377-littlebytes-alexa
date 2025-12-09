import { useEffect, useState } from "react";
import RecipeCarousel from "../components/RecipeCarousel";
import { Link } from "react-router-dom";

function Home() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from backend
  useEffect(() => {
    async function fetchFavorites() {
      const res = await fetch("http://localhost:3001/api/favorites");
      const data = await res.json();
      setFavorites(data.favorites || []);
      setLoading(false);
    }
    fetchFavorites();
  }, []);

  return (
    <div className="p-10 text-parisWine flex flex-col items-center text-center">

      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-7xl font-script font-bold text-parisWine mb-2">
          Welcome to LittleBytes
        </h1>

        <p className="text-2xl opacity-90 leading-relaxed mb-8">
          Your cozy cooking companion inspired by Paris cafés —
          helping students create delicious, budget-friendly meals
          using ingredients they already have.
        </p>

        <Link to="/recipes">
          <button className="mt-4 bg-parisLavender text-white px-8 py-4 rounded-full shadow-lg hover:bg-parisBlue hover:scale-105 transition-all duration-300 text-lg">
            Start Cooking!
          </button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="mt-12 mb-16">
        <img
          src="public/ratatouille-cooking.webp"
          alt="Cozy kitchen illustration"
          className="w-full max-w-xl rounded-3xl shadow-lg border-4 border-parisRose/30"
        />
      </div>

      {/*Favorites Section */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-4xl font-script font-bold text-parisWine mb-6 text-center">
          Your Favorite Recipes 
        </h2>

        {loading && (
          <p className="opacity-70 italic text-center">Loading your favorites…</p>
        )}

        {!loading && favorites.length === 0 && (
          <p className="opacity-70 italic text-center">
            No favorites yet — go save some tasty dishes! 🥖✨
          </p>
        )}

        {/* Carousel */}
        {!loading && favorites.length > 0 && (
          <RecipeCarousel
            recipes={favorites.map((fav) => ({
              idMeal: fav.recipe_id,
              strMeal: fav.recipe_name,
              strMealThumb: fav.image,
            }))}
          />
        )}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full mt-20">
        <div className="bg-white/70 p-6 rounded-2xl shadow-md border border-parisRose/20 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold mb-2">🥗 Ingredient Matching</h3>
          <p className="opacity-80">
            Tell LittleBytes what’s in your pantry and instantly discover recipes you can make.
          </p>
        </div>

        <div className="bg-white/70 p-6 rounded-2xl shadow-md border border-parisRose/20 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold mb-2">📚 Step-by-Step Meals</h3>
          <p className="opacity-80">
            Beautiful recipe pages with clear instructions, images, and ingredients.
          </p>
        </div>

        <div className="bg-white/70 p-6 rounded-2xl shadow-md border border-parisRose/20 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold mb-2">💸 Budget-Friendly</h3>
          <p className="opacity-80">
            Save money, reduce food waste, and make the most of every ingredient.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
