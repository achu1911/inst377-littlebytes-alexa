import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites() {
    const res = await fetch("http://localhost:3001/api/favorites");
    const data = await res.json();
    setFavorites(data.favorites || []);
    setLoading(false);
  }

  async function removeFavorite(id) {
    const confirmDelete = window.confirm("Remove this recipe from favorites?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:3001/api/favorites/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Reload list after delete
      loadFavorites();
    } else {
      alert("Error removing favorite.");
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-parisWine text-xl italic">
        Loading your favorites… 
      </div>
    );

  return (
    <div className="p-10">
      <h1 className="text-5xl font-script font-bold text-parisWine mb-8 text-center">
        Your Favorite Recipes 
      </h1>

      {favorites.length === 0 && (
        <div className="text-center text-parisWine opacity-60 italic text-lg">
          No favorites yet — go save some delicious recipes! 🥖✨
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {favorites.map((meal) => (
          <div
            key={meal.id}
            className="bg-white/70 rounded-xl shadow-xl p-5 border border-parisRose/40"
          >
            <img
              src={meal.image}
              alt={meal.recipe_name}
              className="rounded-xl w-full h-48 object-cover mb-4"
            />

            <h2 className="text-2xl font-cafe text-parisWine mb-3">
              {meal.recipe_name}
            </h2>

            <button
              onClick={() => removeFavorite(meal.id)}
              className="bg-red-400 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 w-full transition"
            >
              Remove ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
