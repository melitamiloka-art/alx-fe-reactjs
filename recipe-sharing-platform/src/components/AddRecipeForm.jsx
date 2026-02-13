import { useState } from "react";

export default function AddRecipeForm({ addRecipe }) {
  
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    const validationErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required";
    if (!ingredients.trim()) validationErrors.ingredients = "Ingredients are required";
    if (!steps.trim()) validationErrors.steps = "Preparation steps are required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    const newRecipe = {
      id: Date.now(), 
      title: title.trim(),
      ingredients: ingredients.trim().split("\n"), 
      steps: steps.trim().split("\n"),
    };
    addRecipe(newRecipe);

    
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-medium mb-1">Recipe Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

       
        <div>
          <label className="block font-medium mb-1">Ingredients (one per line)</label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={4}
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        
        <div>
          <label className="block font-medium mb-1">Preparation Steps (one per line)</label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={4}
          />
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
        </div>

        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}