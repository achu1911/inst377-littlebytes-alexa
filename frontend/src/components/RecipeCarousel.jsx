import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import { Link } from "react-router-dom";

import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

function RecipeCarousel({ recipes }) {
  const glideRef = useRef(null);

  useEffect(() => {
    if (!glideRef.current) return;

    const glide = new Glide(glideRef.current, {
      type: "carousel",
      startAt: 0,
      perView: 1,
      gap: 0,
      animationDuration: 650,
      animationTimingFunc: "cubic-bezier(0.25, 0.8, 0.5, 1)",
      autoplay: false,
      hoverpause: true,
    });

    glide.mount();
    return () => glide.destroy();
  }, [recipes]);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto 
                 bg-white/60 backdrop-blur-md 
                 p-10 rounded-3xl shadow-lg border border-parisRose/20"
      ref={glideRef}
    >
      {/* Track */}
      <div
        className="glide__track overflow-hidden rounded-3xl p-6"
        data-glide-el="track"
      >
        <ul className="glide__slides">
          {recipes.map((meal) => (
            <li
              key={meal.idMeal}
              className="glide__slide flex justify-center pb-8"
            >
              <Link
                to={`/recipes/${meal.idMeal}`}
                className="bg-white p-6 rounded-3xl shadow-xl 
                           border border-parisRose/30 text-center 
                           w-full max-w-md"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-72 object-cover rounded-2xl shadow mb-4"
                />
                <h3 className="text-2xl font-cafe text-parisWine">
                  {meal.strMeal}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrows */}
      <div className="glide__arrows" data-glide-el="controls">
        <button
          className="glide__arrow glide__arrow--left 
                    absolute top-1/2 -left-10 -translate-y-1/2
                    bg-parisWine !opacity-100 !bg-parisWine
                    text-white font-bold
                    border-[3px] border-parisRose
                    p-4 rounded-full shadow-2xl
                    hover:!bg-parisLavender hover:scale-110
                    transition-all duration-200"
          data-glide-dir="<"
        >
          ‹
        </button>

        <button
          className="glide__arrow glide__arrow--right 
                    absolute top-1/2 -right-10 -translate-y-1/2
                    bg-parisWine !opacity-100 !bg-parisWine
                    text-white font-bold
                    border-[3px] border-parisRose
                    p-4 rounded-full shadow-2xl
                    hover:!bg-parisLavender hover:scale-110
                    transition-all duration-200"
          data-glide-dir=">"
        >
          ›
        </button>
      </div>



      {/* Dots */}
      <div
        className="glide__bullets flex justify-center mt-6 gap-1.5"
        data-glide-el="controls[nav]"
      >
        {recipes.map((_, i) => (
          <button
            key={i}
            className="glide__bullet w-2.5 h-2.5 rounded-full 
                       bg-parisRose/70 transition-all 
                       data-[active=true]:bg-parisWine"
            data-glide-dir={`=${i}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default RecipeCarousel;
