import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchFirstLetter,
  fetchIngredient,
  fetchName,
} from "../services/FetchAPI";
import {
  fetchFirstLetterDrinks,
  fetchIngredientDrinks,
  fetchNameDrinks,
} from "../services/FetchAPIDrinks";
import GlobalContext from "../context/GlobalContext";
import "../styles/SearchBar.css";

function SearchBar(): JSX.Element {
  const { setDataApi } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const performSearch = async () => {
    const firstLetter = "first letter";
    const isMealsRoute = location.pathname === "/meals";
    const isInvalidLength = value === firstLetter && text.length > 1;
    if (isInvalidLength) {
      window.alert("Your search must have only 1 (one) character");
      return null;
    }
    if (!text.trim() || !value.trim()) {
      return null;
    }
    let data = null;

    if (isMealsRoute) {
      switch (value) {
        case firstLetter:
          data = await fetchFirstLetter(text);
          break;
        case "ingredient":
          data = await fetchIngredient(text);
          break;
        case "name":
          data = await fetchName(text);
          break;
        default:
          break;
      }
    } else {
      switch (value) {
        case firstLetter:
          data = await fetchFirstLetterDrinks(text);
          break;
        case "ingredient":
          data = await fetchIngredientDrinks(text);
          break;
        case "name":
          data = await fetchNameDrinks(text);
          break;
        default:
          break;
      }
    }

    const hasData = isMealsRoute ? data?.meals : data?.drinks;

    if (!hasData && text.trim()) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
    setDataApi(data);
    return data;
  };

  const handleRedirect = (data: any) => {
    if (data) {
      let id;
      if (
        location.pathname === "/meals" &&
        data.meals &&
        data.meals.length === 1
      ) {
        id = data.meals[0].idMeal;
      }
      if (
        location.pathname === "/drinks" &&
        data.drinks &&
        data.drinks.length === 1
      ) {
        id = data.drinks[0].idDrink;
      }
      if (id) {
        const recipeRoute = location.pathname === "/meals" ? "meals" : "drinks";
        navigate(`/${recipeRoute}/${id}`);
      }
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await performSearch();
    handleRedirect(data);
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          onChange={(event) => setText(event.target.value)}
          className="form-control search-input"
        />
        <div className="input-group-append">
          <button
            type="submit"
            data-testid="exec-search-btn"
            className="btn btn-warning search-button">
            Search
          </button>
        </div>
      </div>

      <div className="radio-options">
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="radio"
            id="ingredient"
            value="ingredient"
            onChange={handleChange}
            data-testid="ingredient-search-radio"
            className="form-check-input"
          />
          <label htmlFor="ingredient" className="form-check-label">
            Ingredient
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="radio"
            id="name"
            value="name"
            onChange={handleChange}
            data-testid="name-search-radio"
            className="form-check-input"
          />
          <label htmlFor="name" className="form-check-label">
            Name
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="radio"
            id="first letter"
            value="first letter"
            onChange={handleChange}
            data-testid="first-letter-search-radio"
            className="form-check-input"
          />
          <label htmlFor="first letter" className="form-check-label">
            First letter
          </label>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
