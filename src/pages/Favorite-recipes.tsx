import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipesType } from '../Type/type';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<FavoriteRecipesType[]>([]);
  const [filter, setFilter] = useState('all');
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleFilterChange = (type: any) => {
    setFilter(type);
  };

  const handleCopyLink = async (id: any, type: any, index: any) => {
    const recipeUrl = `${window.location.origin}/${type}s/${id}`;
    try {
      await navigator.clipboard.writeText(recipeUrl);
      setCopyIndex(index);
      setTimeout(() => {
        setCopyIndex(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleRemoveFavorite = (id: any) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const filteredFavorites = filter === 'all'
    ? favorites
    : favorites.filter((recipe) => recipe.type === filter);

  return (
    <>
      <Header pageTitle="Favorite Recipes" showSearchIcon={ false } />
      <div className="favorite-recipes">
        <div className="filter-buttons">
          <button
            onClick={ () => handleFilterChange('all') }
            data-testid="filter-by-all-btn"
          >
            All

          </button>
          <button
            onClick={ () => handleFilterChange('meal') }
            data-testid="filter-by-meal-btn"
          >
            Meals

          </button>
          <button
            onClick={ () => handleFilterChange('drink') }
            data-testid="filter-by-drink-btn"
          >
            Drinks

          </button>
        </div>

        {filteredFavorites.length > 0 ? (
          <div className="recipe-list">
            {filteredFavorites.map((recipe, index) => (

              <div key={ recipe.id } className="recipe-card">
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                  <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
                </Link>

                <div className="recipe-info">
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {recipe.type === 'meal'
                      ? `${recipe.nationality} - ${recipe.category}`
                      : recipe.alcoholicOrNot}
                  </p>

                  <button
                    data-testid={ `btn-Copy${index}` }
                    onClick={ () => handleCopyLink(recipe.id, recipe.type, index) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src="src/images/shareIcon.svg"
                      alt="Share"
                    />
                  </button>

                  {copyIndex === index && <p>Link copied!</p>}
                  <button
                    data-testid={ `btn-favorite${index}` }
                    onClick={ () => handleRemoveFavorite(recipe.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src="src/images/blackHeartIcon.svg"
                      alt="Favorite"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No favorite recipes.</p>
        )}
      </div>
    </>

  );
}
