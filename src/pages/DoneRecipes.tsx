import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesType } from '../Type/type';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [copyIndex, setCopyIndex] = useState<number | null>(null);
  const [recipeFilter, setRecipeFilter] = useState('all');

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(storedRecipes);
  }, []);

  const filteredRecipes = doneRecipes.filter((recipe) => {
    if (recipeFilter === 'all') return true;
    return recipe.type === recipeFilter;
  });

  const handleCopyLink = (id: string, type: string, index: number) => {
    const recipeURL = `${window.location.origin}/${type}s/${id}`;

    navigator.clipboard.writeText(recipeURL)
      .then(() => {
        setCopyIndex(index);
        setTimeout(() => {
          setCopyIndex(null);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error copying link:', error);
      });
  };

  console.log(JSON.parse(localStorage.getItem('doneRecipes') || '[]'));

  return (
    <div>
      <Header pageTitle="Done Recipes" showSearchIcon={ false } />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setRecipeFilter('all') }
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setRecipeFilter('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setRecipeFilter('drink') }
      >
        Drinks
      </button>

      {filteredRecipes.map((recipe, index) => (

        <div key={ index }>

          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              style={ { maxWidth: '120px', maxHeight: '120px' } }
            />
          </Link>

          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type
            === 'meal' ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>

          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

          <button
            onClick={ () => handleCopyLink(recipe.id, recipe.type, index) }
          >
            <img
              src={ shareIcon }
              alt="Share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>

          {copyIndex === index && <p>Link copied!</p>}
          {recipe.tags.map((tag, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
