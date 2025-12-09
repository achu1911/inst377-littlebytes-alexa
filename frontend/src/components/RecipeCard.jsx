function RecipeCard({ meal }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-parisLavender hover:scale-105 transition transform duration-200">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-xl mb-4 object-cover w-full h-48"
      />

      <h3 className="text-xl font-bold text-parisWine mb-2">
        {meal.strMeal}
      </h3>

      <a
        href={`/recipes/${meal.idMeal}`}
        className="text-parisBlue underline hover:text-parisLavender"
      >
        View Recipe →
      </a>
    </div>
  );
}

export default RecipeCard;
