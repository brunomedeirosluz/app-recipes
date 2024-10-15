import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchApi } from "../services/FetchAPI";
import whiteHeartIcon from "../images/whiteHeartIcon.svg";
import blackHeartIcon from "../images/blackHeartIcon.svg";
import shareIcon from "../images/shareIcon.svg";
import { Button, Container, ListGroup } from "react-bootstrap";
import "../styles/RecipeInProgress.css";

type DataRecipeObjTypes = {
  strCategory: string;
  strMeal: string;
  strDrink: string;
  strMealThumb: string;
  strDrinkThumb: string;
  strInstructions: string;
  strArea: string;
  strAlcoholic: string;
  ingredients: string[];
};
const INITIAL_VALUE = {
  strCategory: "",
  strMeal: "",
  strDrink: "",
  strMealThumb: "",
  strDrinkThumb: "",
  strInstructions: "",
  strArea: "",
  strAlcoholic: "",
  ingredients: [],
};

export default function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const favoriteRecipesData = localStorage.getItem("favoriteRecipes");

  const [dataRecipeObj, setDataRecipeObj] =
    useState<DataRecipeObjTypes>(INITIAL_VALUE);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>(() => {
    const storedCheckedIngredients = localStorage.getItem("inProgressRecipes");
    return storedCheckedIngredients ? JSON.parse(storedCheckedIngredients) : [];
  });
  const [copyMessage, setCopyMessage] = useState("");
  const [data, setData] = useState<any>();
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  function handleNavigate() {
    const doneRecipesData = localStorage.getItem("doneRecipes");
    const doneRecipes = doneRecipesData ? JSON.parse(doneRecipesData) : [];
    const date = new Date();
    const obj = {
      id: data.idMeal || data.idDrink,
      type: data.strMeal ? "meal" : "drink",
      nationality: data.strArea || "",
      category: data.strCategory || "",
      alcoholicOrNot: data.strAlcoholic || "",
      name: data.strMeal || data.strDrink,
      image: data.strMealThumb || data.strDrinkThumb,
      doneDate: date.toLocaleDateString("pt-BR"),
      tags: data.strTags ? data.strTags.split(",") : [],
    };
    doneRecipes.push(obj);
    localStorage.setItem("doneRecipes", JSON.stringify(doneRecipes));
    navigate("/done-recipes");
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = location.pathname.includes("/meals/")
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      try {
        const response = await fetchApi(apiUrl);
        const { meals, drinks } = response;

        if (location.pathname.includes("/meals/") && meals) {
          setData(meals[0]);
          console.log(meals[0]);
          processRecipeData(meals[0]);
        } else if (location.pathname.includes("/drinks/") && drinks) {
          setData(drinks[0]);
          processRecipeData(drinks[0]);
        }
      } catch (error) {
        console.error("Failed to fetch recipe data:", error);
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

    fetchData();
  }, [id, location.pathname]);

  useEffect(() => {
    const handleFavorite = () => {
      const favoriteRecipes = favoriteRecipesData
        ? JSON.parse(favoriteRecipesData)
        : [];
      if (favoriteRecipes) {
        const result = favoriteRecipes.some((obj: any) => obj.id === id);
        setIsFavorited(result);
      }
    };
    handleFavorite();
  }, [id, favoriteRecipesData]);

  const handleIngredientCheck = (ingredientItem: string) => {
    if (checkedIngredients.includes(ingredientItem)) {
      setCheckedIngredients((prevCheckedIngredients) =>
        prevCheckedIngredients.filter((item) => item !== ingredientItem)
      );
    } else {
      setCheckedIngredients((prevCheckedIngredients) => [
        ...prevCheckedIngredients,
        ingredientItem,
      ]);
    }
  };

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

  useEffect(() => {
    localStorage.setItem(
      "inProgressRecipes",
      JSON.stringify(checkedIngredients)
    );
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

  const areAllIngredientsChecked = () => {
    return ingredients.every((ingredientItem) =>
      checkedIngredients.includes(ingredientItem)
    );
  };

  const handleFavorite = () => {
    const favoriteRecipes = favoriteRecipesData
      ? JSON.parse(favoriteRecipesData)
      : [];
    if (!isFavorited) {
      favoriteRecipes.push({
        id: data.idDrink || data.idMeal,
        type: data.idDrink ? "drink" : "meal",
        nationality: data.strArea || "",
        category: data.strCategory,
        alcoholicOrNot: data.strAlcoholic || "",
        name: data.strDrink || data.strMeal,
        image: data.strDrinkThumb || data.strMealThumb,
      });
      localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
      setIsFavorited(true);
      console.log(favoriteRecipes);
    } else {
      const newFavorite = favoriteRecipes.filter((obj: any) => obj.id !== id);
      localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorite));
      setIsFavorited(false);
      console.log(newFavorite);
    }
  };

  return (
    <Container className="mt-5">
      <h1 data-testid="recipe-title" className="text-center">
        {strMeal || strDrink}
      </h1>
      <h3 data-testid="recipe-category" className="text-center mb-3">
        {strCategory}
      </h3>

      <img
        className="recipe-card img-fluid mx-auto d-block"
        data-testid="recipe-photo"
        src={strMealThumb || strDrinkThumb}
        alt={strMeal || strDrink}
      />

      <div className="d-flex justify-content-center mt-5 mb-3">
        <Button variant="link" onClick={handleFavorite}>
          {isFavorited ? (
            <img
              data-testid="favorite-btn"
              src={blackHeartIcon}
              alt="Remove from favorites"
            />
          ) : (
            <img
              data-testid="favorite-btn"
              src={whiteHeartIcon}
              alt="Add to favorites"
            />
          )}
        </Button>
        <Button
          variant="link"
          data-testid="share-btn"
          onClick={handleShareClick}>
          <img src={shareIcon} alt="Share" />
          {copyMessage && <div className="text-success">{copyMessage}</div>}
        </Button>
      </div>

      <h4 className="mt-4">Ingredients:</h4>
      <ListGroup className="border border-dark p-3 mb-4">
        {ingredients.map((ingredientItem, index) => (
          <ListGroup.Item
            key={ingredientItem}
            className="d-flex align-items-center">
            <label
              data-testid={`${index}-ingredient-step`}
              className={
                checkedIngredients.includes(ingredientItem)
                  ? "line-through-text"
                  : ""
              }>
              <input
                className="m-2"
                type="checkbox"
                id={`${ingredientItem}-${index}`}
                onChange={() => handleIngredientCheck(ingredientItem)}
                checked={checkedIngredients.includes(ingredientItem)}
              />
              {ingredientItem}
            </label>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h4 className="mt-4">Instructions:</h4>
      <p data-testid="instructions" className="border border-dark p-3 mb-4">
        {strInstructions}
      </p>

      <Button
        data-testid="finish-recipe-btn"
        disabled={!areAllIngredientsChecked()}
        onClick={handleNavigate}
        className="start-btn">
        Finalizar Receita
      </Button>
    </Container>
  );
}
