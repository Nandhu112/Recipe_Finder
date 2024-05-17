// src/components/Home.jsx
import React, { useState } from 'react';
import RecipeDetails from './RecipeDetails';
import Favorites from './Favorites';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=9791a88f813d41138c55da146d0f40bb`);
      const data = await response.json();
      setRecipes(data);
      setSelectedRecipe(null); // Reset selected recipe when searching for new recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = async () => {
    if (ingredients !== '') {
      await fetchRecipes();
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsOpen(true);
  };

  const homeHandler = () => {
    setRecipes([]);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div>
      <nav className="bg-teal-500 p-4 fixed top-0 w-full flex justify-between items-center z-10">
        <div className="flex items-center space-x-4">
          <button onClick={homeHandler} className="text-white">Home</button>
          <button onClick={toggleFavorites} className="text-white">Favorites</button>
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold">Recipe Finder</h1>
        </div>
        <div></div>
      </nav>

      <div className="container mx-auto min-h-screen pt-16 flex flex-col" style={{ background: 'linear-gradient(to right, #1b797e, #130318)' }}>
        {recipes.length <= 0 ? (
          <div className="flex-grow flex justify-center items-center">
            <div className="w-1/2 flex">
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="flex-grow p-3 rounded-l-lg border-2 border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg"
                placeholder="Enter your ingredients..."
              />
              <button
                onClick={handleSearch}
                className="p-3 rounded-r-lg bg-teal-500 text-white font-bold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg"
              >
                Search
              </button>
            </div>
          </div>
        ) : null}

        <div className="mb-10 flex flex-col items-center mt-8">
          {isOpen && <RecipeDetails selectedRecipe={selectedRecipe} isOpen={isOpen} setIsOpen={setIsOpen} />}
          {recipes.length > 0 && (
            <div className="ml-10 mr-10">
              <h2 className="text-2xl font-bold mb-4 text-white">Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                      <button onClick={() => handleRecipeClick(recipe)} className="bg-teal-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 self-end">
                        View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {showFavorites && <Favorites />}
      </div>
    </div>
  );
};

export default Home;