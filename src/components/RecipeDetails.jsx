import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

function RecipeDetails({ selectedRecipe, onClose,isOpen,setIsOpen }) {

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={`${isOpen ? 'fixed' : 'hidden'} z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative">
          <button 
            onClick={handleClose} 
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <FaHeart
              className={isFavorite ? 'text-red-500' : 'text-gray-500'}
              onClick={toggleFavorite}
            />
          </button>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedRecipe?.title}</h3>
                <div className="mt-2">
                  <img  src={selectedRecipe?.image} alt="" className=" w-full h-auto" />
                  <div className="mt-4">
                    <h4 className="text-base font-medium text-gray-900">Ingredients:</h4>
                    <ul className="mt-2 text-gray-600">
                      {selectedRecipe?.usedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.name} - {ingredient.amount} {ingredient.unit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-500 text-base font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
