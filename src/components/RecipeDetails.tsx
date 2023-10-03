import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { fetchApi, fetchRecipeDrink, fetchRecipeMeal } from '../services/FetchAPI';
import { DoneRecipesType, DrinkType, MealType } from '../Type/type';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { FilterIngredients } from './HandleDetails';
import '../App.css';

function RecipeDetails() {
  const [data, setData] = useState<any>();
  const [isDrink, setIsDrink] = useState(false);
  const [recipeDone, setRecipeDone] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [dataRecommended, setDataRecommended] = useState<DrinkType[] | MealType[]>([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const doneRecipesData = localStorage.getItem('doneRecipes');
  const inProgressData = localStorage.getItem('inProgressRecipes');
  const recommendedMealsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recommendedDrinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fetchRecipe = async () => {
      if (location.pathname.startsWith('/drinks/') && id) {
        try {
          setIsDrink(true);
          const response = await fetchRecipeDrink(id);
          setData(response.drinks[0]);
        } catch (error) {
          console.error('Erro ao carregar a receita', error);
        }
      } else if (id) {
        try {
          const response = await fetchRecipeMeal(id);
          setData(response.meals[0]);
        } catch (error) {
          console.error('Erro ao carregar a receita', error);
        }
      }
    }; fetchRecipe();
  }, [id, location, inProgressData, isDrink]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (inProgressData && id) {
        try {
          const parsedData = JSON.parse(inProgressData);
          if (isDrink) {
            const dataKeys = Object.keys(parsedData.drinks || {});
            const result = dataKeys.includes(id);
            setRecipeInProgress(result);
          } else {
            const dataKeys = Object.keys(parsedData.meals || {});
            const result = dataKeys.includes(id);
            setRecipeInProgress(result);
          }
        } catch (error) {
          console.error('Erro ao analisar dados JSON:', error);
        }
      }
    }; fetchRecipe();
  }, [id, inProgressData, isDrink]);

  useEffect(() => {
    const recommended = async () => {
      if (doneRecipesData) {
        const doneRecipes = JSON.parse(doneRecipesData);
        const result = doneRecipes.some((obj: DoneRecipesType) => obj.id === id);
        setRecipeDone(result);
      }
      const dataAPI = location.pathname === `/meals/${id}`
        ? await fetchApi(recommendedDrinksAPI)
        : await fetchApi(recommendedMealsAPI);
      if (location.pathname === `/meals/${id}`) {
        const { drinks } = dataAPI;
        const result = drinks.slice(0, 6);
        setDataRecommended(result);
      } if (location.pathname === `/drinks/${id}`) {
        const { meals } = dataAPI;
        const result = meals.slice(0, 6);
        setDataRecommended(result);
      }
    }; recommended();
  }, [id, location, doneRecipesData]);

  if (data && isDrink) {
    const filteredIngredients = FilterIngredients(data);
    return (
      <>
        <h1 data-testid="recipe-title">{ data.strDrink }</h1>
        <h3
          className="recommended-cards"
          data-testid="recipe-category"
        >
          {`${data.strCategory} ${data.strAlcoholic}`}
        </h3>
        <button data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="white Heart Icon" />
        </button>
        <button data-testid="share-btn">
          <img src={ shareIcon } alt="share Icon" />
        </button>
        <img
          data-testid="recipe-photo"
          src={ data.strDrinkThumb }
          width="200"
          alt={ data.strDrink }
        />
        <ul>
          {filteredIngredients.map((obj, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              {`${obj.measure} ${obj.ingredient}`}
            </li>))}
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <div className="recommended-cards">
          <h3>Recommended</h3>
          <ul>
            {
            dataRecommended && dataRecommended.map((option, index) => (
              <li key={ option.idDrink || option.idMeal }>
                <div
                  className="recommended-card"
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ option.strDrinkThumb || option.strMealThumb }
                    alt={ option.strDrink || option.strMeal }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    { option.strDrink || option.strMeal}
                  </p>
                </div>

              </li>
            ))
          }
          </ul>
          {!recipeDone && (
            <button
              className="start-btn"
              data-testid="start-recipe-btn"
              onClick={ () => navigate(`/drinks/${id}/in-progress`) }
            >
              {(recipeInProgress) ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}
        </div>
      </>
    );
  } if (data) {
    const filteredIngredients = FilterIngredients(data);
    const embedUrl = data.strYoutube.replace('/watch?v=', '/embed/');
    return (
      <>
        <h1 data-testid="recipe-title">{ data.strMeal }</h1>
        <h3 data-testid="recipe-category">{ data.strCategory }</h3>
        <button data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="white Heart Icon" />
        </button>
        <button data-testid="share-btn">
          <img src={ shareIcon } alt="share Icon" />
        </button>
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb }
          width="200"
          alt={ data.strMeal }
        />
        <ul>
          {filteredIngredients.map((obj, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              { `${obj.measure} ${obj.ingredient}` }
            </li>))}
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ embedUrl }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share"
          allowFullScreen
        />
        {!recipeDone && (
          <button
            className="start-btn"
            data-testid="start-recipe-btn"
            onClick={ () => navigate(`/meals/${id}/in-progress`) }
          >
            {(recipeInProgress) ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
        <div className="recommended-cards">
          <h3>Recommended</h3>
          <ul>
            {
            dataRecommended && dataRecommended.map((option, index) => (
              <li key={ option.idDrink || option.idMeal }>
                <div
                  className="recommended-card"
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ option.strDrinkThumb || option.strMealThumb }
                    alt={ option.strDrink || option.strMeal }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    { option.strDrink || option.strMeal}
                  </p>
                </div>

              </li>
            ))
          }
          </ul>
        </div>
      </>
    );
  }
}

export default RecipeDetails;
