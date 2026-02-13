import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import recipesData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Recipe Sharing Platform
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`} 
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm">{recipe.summary}</p>

                <span className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  View Recipe
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;