import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../Type/type';
import { fetchApi } from '../services/FetchAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

type DataRecipeObjTypes = {
  strCategory: string,
  strMeal: string,
  strDrink: string,
  strMealThumb: string,
  strDrinkThumb: string,
  strInstructions: string,
};

const INITIALVALUE = {
  strCategory: '',
  strMeal: '',
  strDrink: '',
  strMealThumb: '',
  strDrinkThumb: '',
  strInstructions: '',
};

export default function RecipeInProgress() {
  const [dataRecipe, setDataRecipe] = useState<DrinkType[] | MealType[]>([]);
  const [dataRecipeObj, setDataRecipeObj] = useState<DataRecipeObjTypes>(INITIALVALUE);
  const [ingredient, setIngredient] = useState('');
  const { id } = useParams();

  const location = useLocation();

  const startRecipe = async () => {
    const data = location.pathname === `/meals/${id}/in-progress`
      ? await fetchApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      : await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

    if (location.pathname === `/meals/${id}/in-progress`) {
      const { meals } = data;
      setDataRecipe(meals);
      setDataRecipeObj(meals[0]);
    }
    if (location.pathname === `/drinks/${id}/in-progress`) {
      const { drinks } = data;
      setDataRecipe(drinks);
      setDataRecipeObj(drinks[0]);
    }
  };

  const {
    strCategory,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
    strInstructions,

  } = dataRecipeObj;

  console.log(dataRecipe);

  useEffect(() => {
    startRecipe();
  }, []);

  return (
    <div>
      <p data-testid="recipe-category">{ strCategory}</p>
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
      />
      <button data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="white Heart Icon" />
      </button>
      <button data-testid="share-btn">
        <img src={ shareIcon } alt="white Heart Icon" />
      </button>
      <ul>
        {
      dataRecipe.slice(0, 7).map((recipe, index) => (
        <div key={ id }>
          <input type="checkbox" name="" id={ `{recipe.strIngredient1 ${index + 1}}` } />
          <label
            htmlFor={ `{recipe.strIngredient1 ${index + 1}}` }
          >
            { `{recipe.strIngredient1 ${index + 1}}` }
            {' '}
            { `{recipe.strIngredient1 ${index + 1}}` }

          </label>
        </div>
      ))
}
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

// O elemento de instruções deve ter o atributo data-testid="instructions".
// O botão para finalizar a receita deve ter o atributo data-testid="finish-recipe-btn".

// setIngredient();
// .forEach((item: DrinkType[] | MealType[]) => {
//   const items = {
//     1: `${item.strIngredient1} ${item.strMeasure1}`,
//     2: `${item.strIngredient2} ${item.strMeasure2}`,
//     3: `${item.strIngredient3} ${item.strMeasure3}`,
//     4: `${item.strIngredient4} ${item.strMeasure4}`,
//   };
//   return items;
// }));
