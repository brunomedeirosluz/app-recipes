import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoute } from '../context/RouteContext';
import { fetchFirstLetter, fetchIngredient, fetchName } from '../services/FetchAPI';
import { fetchFirstLetterDrinks,
  fetchIngredientDrinks, fetchNameDrinks } from '../services/FetchAPIDrinks';

function SearchBar() {
  const { currentPath } = useRoute();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const performSearch = async () => {
    const firstLetter = 'first letter';
    const isMealsRoute = currentPath === '/meals';
    const isInvalidLength = value === firstLetter && text.length > 1;

    if (isInvalidLength) {
      window.alert('Your search must have only 1 (one) character');
      return null;
    }

    let data = null;

    if (isMealsRoute) {
      if (value === firstLetter) {
        data = await fetchFirstLetter(text);
      } else if (value === 'ingredient') {
        data = await fetchIngredient(text);
      } else if (value === 'name') {
        data = await fetchName(text);
      }
    } else {
      if (value === firstLetter) {
        data = await fetchFirstLetterDrinks(text);
      } if (value === 'ingredient') {
        data = await fetchIngredientDrinks(text);
      } if (value === 'name') {
        data = await fetchNameDrinks(text);
        console.log(data);
      }
    }
    return data;
  };

  const handleRedirect = (data: any) => {
    if (data) {
      let id;
      if (currentPath === '/meals' && data.meals && data.meals.length === 1) {
        id = data.meals[0].idMeal;
      } else if (currentPath === '/drinks' && data.drinks && data.drinks.length === 1) {
        id = data.drinks[0].idDrink;
      }
      if (id) {
        const recipeRoute = currentPath === '/meals' ? 'meals' : 'drinks';
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
    <form onSubmit={ handleSearch }>
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
        onChange={ (event) => setText(event.target.value) }
      />
      <input
        type="radio"
        name="radio"
        id="ingredient"
        value="ingredient"
        onChange={ handleChange }
        data-testid="ingredient-search-radio"
      />
      <label htmlFor="ingredient">Ingredient</label>

      <input
        type="radio"
        name="radio"
        id="name"
        value="name"
        onChange={ handleChange }
        data-testid="name-search-radio"
      />
      <label htmlFor="name">Name</label>

      <input
        type="radio"
        name="radio"
        id="first letter"
        value="first letter"
        onChange={ handleChange }
        data-testid="first-letter-search-radio"
      />
      <label htmlFor="first letter">First letter</label>

      <button
        data-testid="exec-search-btn"
        type="submit"
      >
        SEARCH

      </button>
    </form>

  );
}

export default SearchBar;
