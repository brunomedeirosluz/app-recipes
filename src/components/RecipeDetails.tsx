import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { fetchApi, fetchRecipeMeal } from '../services/FetchAPI';
import { fetchRecipeDrink } from '../services/FetchAPIDrinks';
import { DoneRecipesType, DrinkType, MealType } from '../Type/type';
import '../App.css';

function FilterIngredients(data: any) {
  const ingredients = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith('strIngredient') && data[key]) {
      const ingredientNumber = key.replace('strIngredient', '');
      const measureKey = `strMeasure${ingredientNumber}`;
      const ingredient = data[key] as string;
      const measure = data[measureKey] as string;
      acc.push({ ingredient, measure });
    }
    return acc;
  }, [] as { ingredient: string; measure: string | null }[]);
  return ingredients;
}

function RecipeDetails() {
  const [data, setData] = useState<any>();
  const [isDrink, setIsDrink] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [dataRecommended, setDataRecommended] = useState<DrinkType[] | MealType[]>([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const doneRecipesData = localStorage.getItem('doneRecipes');

  const recommendedMealsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recommendedDrinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fetchRecipe = async () => {
      if (doneRecipesData) {
        const doneRecipes = JSON.parse(doneRecipesData);
        const result = doneRecipes.some((obj: DoneRecipesType) => obj.id === id);
        setIsRecipeDone(result);
      }
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
    };
    fetchRecipe();
  }, [id, location, doneRecipesData]);

  useEffect(() => {
    const recommended = async () => {
      const dataAPI = location.pathname === `/meals/${id}`
        ? await fetchApi(recommendedDrinksAPI)
        : await fetchApi(recommendedMealsAPI);

      if (location.pathname === `/meals/${id}`) {
        const { drinks } = dataAPI;
        const result = drinks.slice(0, 6);
        setDataRecommended(result);
      }
      if (location.pathname === `/drinks/${id}`) {
        const { meals } = dataAPI;
        const result = meals.slice(0, 6);
        setDataRecommended(result);
      }
    };

    recommended();
  }, [id, location]);

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
        {!isRecipeDone && (
          <button
            className="start-btn"
            data-testid="start-recipe-btn"
            onClick={ () => navigate(`/drinks/${id}/in-progress`) }
          >
            Start Recipe
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
  } if (data) {
    const filteredIngredients = FilterIngredients(data);
    const embedUrl = data.strYoutube.replace('/watch?v=', '/embed/');
    return (
      <>
        <h1 data-testid="recipe-title">{ data.strMeal }</h1>
        <h3 data-testid="recipe-category">{ data.strCategory }</h3>
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
        <p data-testid="instructions">{ data.strInstructions }</p>
        {!isRecipeDone && (
          <button
            className="start-btn"
            data-testid="start-recipe-btn"
            onClick={ () => navigate(`/meals/${id}/in-progress`) }
          >
            Start Recipe
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
