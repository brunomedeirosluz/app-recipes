import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { fetchRecipeDrink, fetchRecipeMeal } from '../services/FetchAPI';

function FilterIngredients(data) {
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
  const { id } = useParams();
  const location = useLocation();

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
    };
    fetchRecipe();
  }, [id, location]);

  if (data && isDrink) {
    const filteredIngredients = FilterIngredients(data);
    return (
      <>
        <h1 data-testid="recipe-title">{ data.strDrink }</h1>
        <h3 data-testid="recipe-category">
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
      </>
    );
  }
}

export default RecipeDetails;
