import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>

            <Link to={`/recipes/${recipe.id}`}>
              View Recipe
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;