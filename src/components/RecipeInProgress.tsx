import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchApi } from '../services/FetchAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

type DataRecipeObjTypes = {
  strCategory: string;
  strMeal: string;
  strDrink: string;
  strMealThumb: string;
  strDrinkThumb: string;
  strInstructions: string;
  ingredients: string[];
};

const INITIAL_VALUE = {
  strCategory: '',
  strMeal: '',
  strDrink: '',
  strMealThumb: '',
  strDrinkThumb: '',
  strInstructions: '',
  ingredients: [],
};

export default function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();

  const [dataRecipeObj, setDataRecipeObj] = useState<DataRecipeObjTypes>(
    INITIAL_VALUE,
  );
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>(
    () => {
      const storedCheckedIngredients = localStorage.getItem(
        'inProgressRecipes',
      );
      return storedCheckedIngredients
        ? JSON.parse(storedCheckedIngredients)
        : [];
    },
  );

  const [copyMessage, setCopyMessage] = useState('');

  const fetchData = async () => {
    const apiUrl = location.pathname.includes('/meals/')
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    try {
      const response = await fetchApi(apiUrl);
      const { meals, drinks } = response;

      if (location.pathname.includes('/meals/') && meals) {
        processRecipeData(meals[0]);
      } else if (location.pathname.includes('/drinks/') && drinks) {
        processRecipeData(drinks[0]);
      }
    } catch (error) {
      console.error('Failed to fetch recipe data:', error);
    }
  };

  const processRecipeData = (recipeData: any) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      if (recipeData[ingredientKey]) {
        ingredients.push(recipeData[ingredientKey]);
      }
    }
    setDataRecipeObj({ ...recipeData, ingredients });
  };

  const handleIngredientCheck = (ingredientItem: string) => {
    if (checkedIngredients.includes(ingredientItem)) {
      setCheckedIngredients((prevCheckedIngredients) => prevCheckedIngredients
        .filter((item) => item !== ingredientItem));
    } else {
      setCheckedIngredients((prevCheckedIngredients) => [
        ...prevCheckedIngredients,
        ingredientItem,
      ]);
    }
  };

  const handleShareClick = () => {
    const recipeLink = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(recipeLink).then(() => {
      setCopyMessage('Link copied!');
      setTimeout(() => {
        setCopyMessage('');
      }, 1000);
    }).catch((error) => {
      console.error('Failed to copy link:', error);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
  }, [checkedIngredients]);

  const {
    strCategory,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
    strInstructions,
    ingredients,
  } = dataRecipeObj;

  return (
    <div>
      <p data-testid="recipe-category">{strCategory}</p>
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      <img
        className="recipe-card"
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
      />
      <button data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="white Heart Icon" />
      </button>
      <button data-testid="share-btn" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="share Icon" />
        {copyMessage && <div>{copyMessage}</div>}
      </button>
      <ul>
        {ingredients.map((ingredientItem, index) => (
          <li key={ ingredientItem }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={ checkedIngredients
                .includes(ingredientItem) ? 'line-through-text' : '' }
            >
              <input
                type="checkbox"
                id={ `${ingredientItem}-${index}` }
                onChange={ () => handleIngredientCheck(ingredientItem) }
                checked={ checkedIngredients.includes(ingredientItem) }
              />
              {ingredientItem}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}
