import { Link } from "react-router-dom";

function RecipeCard({ meal }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-parisLavender hover:scale-105 transition transform duration-200">
      {/* Recipe Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-xl mb-4 object-cover w-full h-48"
      />

      {/* Recipe Title */}
      <h3 className="text-xl font-bold text-parisWine mb-2">
        {meal.strMeal}
      </h3>

      {/* View Recipe Link (React Router) */}
      <Link
        to={`/recipes/${meal.idMeal}`}
        className="text-parisBlue underline hover:text-parisLavender"
      >
        View Recipe →
      </Link>
    </div>
  );
}

export default RecipeCard;
