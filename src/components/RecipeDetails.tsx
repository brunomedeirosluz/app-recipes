import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { fetchApi, fetchRecipeMeal } from "../services/FetchAPI";
import { fetchRecipeDrink } from "../services/FetchAPIDrinks";
import { DoneRecipesType, DrinkType, MealType } from "../Type/type";
import whiteHeartIcon from "../whiteHeartIcon.svg";
import shareIcon from "../shareIcon.svg";
import blackHeartIcon from "../blackHeartIcon.svg";
import { Container, Button, Row, Col } from "react-bootstrap";
import "../styles/RecipeDetails.css";
import Header from "./Header";

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [isDrink, setIsDrink] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeDone, setRecipeDone] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [dataRecommended, setDataRecommended] = useState<
    DrinkType[] | MealType[]
  >([]);
  const doneRecipesData = localStorage.getItem("doneRecipes");
  const inProgressData = localStorage.getItem("inProgressRecipes");
  const favoriteRecipesData = localStorage.getItem("favoriteRecipes");
  const recommendedMealsAPI =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const recommendedDrinksAPI =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  useEffect(() => {
    const fetchRecipe = async () => {
      if (location.pathname.startsWith("/drinks/") && id) {
        try {
          setIsDrink(true);
          const response = await fetchRecipeDrink(id);
          setData(response.drinks[0]);
        } catch (error) {
          console.error("Erro ao carregar a receita", error);
        }
      } else if (id) {
        try {
          const response = await fetchRecipeMeal(id);
          setData(response.meals[0]);
        } catch (error) {
          console.error("Erro ao carregar a receita", error);
        }
      }
    };
    fetchRecipe();
  }, [id, location]);

  useEffect(() => {
    const handleInProgress = () => {
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
          console.error("Erro ao analisar dados JSON:", error);
        }
      }
    };
    handleInProgress();
  }, [id, inProgressData, isDrink]);

  useEffect(() => {
    const recommended = async () => {
      if (doneRecipesData) {
        const doneRecipes = JSON.parse(doneRecipesData);
        const result = doneRecipes.some(
          (obj: DoneRecipesType) => obj.id === id
        );
        setRecipeDone(result);
      }

      try {
        const dataAPI =
          location.pathname === `/meals/${id}`
            ? await fetchApi(recommendedDrinksAPI)
            : await fetchApi(recommendedMealsAPI);

        if (location.pathname === `/meals/${id}`) {
          const { drinks } = dataAPI;
          // Verifique se drinks é um array
          const result = Array.isArray(drinks) ? drinks.slice(0, 6) : [];
          setDataRecommended(result);
        }
        if (location.pathname === `/drinks/${id}`) {
          const { meals } = dataAPI;
          // Verifique se meals é um array
          const result = Array.isArray(meals) ? meals.slice(0, 6) : [];
          setDataRecommended(result);
        }
      } catch (error) {
        console.error("Erro ao carregar receitas recomendadas:", error);
      }
    };
    recommended();
  }, [id, location, doneRecipesData]);

  useEffect(() => {
    const handleFavorite = () => {
      const favoriteRecipes = favoriteRecipesData
        ? JSON.parse(favoriteRecipesData)
        : [];
      if (favoriteRecipes) {
        const result = favoriteRecipes.some((obj: any) => obj.id === id);
        setIsFavorite(result);
      }
    };
    handleFavorite();
  }, [id, favoriteRecipesData]);

  const handleShareClick = () => {
    const recipeLink = window.location.href.replace("/in-progress", "");
    navigator.clipboard
      .writeText(recipeLink)
      .then(() => {
        setCopyMessage("Link copied!");
        setTimeout(() => {
          setCopyMessage("");
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  const handleFavorite = () => {
    const favoriteRecipes = favoriteRecipesData
      ? JSON.parse(favoriteRecipesData)
      : [];
    if (!isFavorite) {
      favoriteRecipes.push({
        id: isDrink ? data.idDrink : data.idMeal,
        type: isDrink ? "drink" : "meal",
        nationality: isDrink ? "" : data.strArea,
        category: data.strCategory,
        alcoholicOrNot: isDrink ? data.strAlcoholic : "",
        name: isDrink ? data.strDrink : data.strMeal,
        image: isDrink ? data.strDrinkThumb : data.strMealThumb,
      });
      localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
    } else {
      const newFavorite = favoriteRecipes.filter((obj: any) => obj.id !== id);
      localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorite));
      setIsFavorite(false);
    }
  };

  const filterIngredients = () => {
    const ingredients = Object.keys(data).reduce((acc, key) => {
      if (key.startsWith("strIngredient") && data[key]) {
        const ingredientNumber = key.replace("strIngredient", "");
        const measureKey = `strMeasure${ingredientNumber}`;
        const ingredient = data[key] as string;
        const measure = data[measureKey] as string;
        acc.push({ ingredient, measure });
      }
      return acc;
    }, [] as { ingredient: string; measure: string | null }[]);
    return ingredients;
  };

  if (data) {
    const filteredIngredients = filterIngredients();
    return (
      <Container className="mt-5">
        <h1 data-testid="recipe-title" className="text-center">
          {data.strDrink || data.strMeal}
        </h1>
        <h3
          className="recommended-cards text-center"
          data-testid="recipe-category">
          {isDrink
            ? `${data.strCategory} - ${data.strAlcoholic}`
            : `${data.strCategory}`}
        </h3>

        <div className="d-flex justify-content-center mb-3">
          <Button variant="link" onClick={handleFavorite}>
            <img
              data-testid="favorite-btn"
              src={isFavorite ? blackHeartIcon : whiteHeartIcon}
              alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
            />
          </Button>
          <Button
            variant="link"
            data-testid="share-btn"
            onClick={handleShareClick}>
            <img src={shareIcon} alt="Share" />
            {copyMessage && <div className="text-success">{copyMessage}</div>}
          </Button>
        </div>

        <img
          data-testid="recipe-photo"
          src={data.strDrinkThumb || data.strMealThumb}
          className="img-fluid mx-auto d-block"
          alt={data.strDrink || data.strMeal}
        />

        <h4 className="mt-4">Ingredients:</h4>
        <ul className="border border-dark py-3">
          {filteredIngredients.map((obj, i) => (
            <li key={i} data-testid={`${i}-ingredient-name-and-measure`}>
              {`${obj.measure ? obj.measure : ""} ${obj.ingredient}`}
            </li>
          ))}
        </ul>

        <h4 className="mt-4">Instructions:</h4>
        <p className="border border-dark p-3" data-testid="instructions">
          {data.strInstructions}
        </p>

        {!isDrink && (
          <div className="video-container mb-4">
            <iframe
              data-testid="video"
              width="100%"
              height="315"
              src={data.strYoutube.replace("/watch?v=", "/embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        <div className="recommended-cards mt-4">
          <h3>Recommended</h3>
          <Row>
            {dataRecommended &&
              dataRecommended.map((option, index) => (
                <Col xs={6} md={4} lg={3} key={option.idDrink || option.idMeal}>
                  <div
                    className="recommended-card m-1"
                    data-testid={`${index}-recommendation-card`}>
                    <img
                      src={option.strDrinkThumb || option.strMealThumb}
                      alt={option.strDrink || option.strMeal}
                      className="img-fluid px-1"
                    />
                    <p data-testid={`${index}-recommendation-title`}>
                      {option.strDrink || option.strMeal}
                    </p>
                  </div>
                </Col>
              ))}
          </Row>

          {!recipeDone && (
            <Button
              className="start-btn mt-4"
              data-testid="start-recipe-btn"
              onClick={() =>
                navigate(`/${isDrink ? "drinks" : "meals"}/${id}/in-progress`)
              }>
              {recipeInProgress ? "Continue Recipe" : "Start Recipe"}
            </Button>
          )}
        </div>
      </Container>
    );
  }
}

export default RecipeDetails;
