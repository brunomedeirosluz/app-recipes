import { useState } from 'react';
import { fetchFirstLetter, fetchIngredient, fetchName } from '../services/FetchAPI';

function SearchBar() {
  const [value, setValue] = useState('');
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === 'first letter' && text.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    } if (value === 'first letter') {
      const data = await fetchFirstLetter(text);
      return data;
    }
    if (value === 'ingredient') {
      const data = await fetchIngredient(text);
      return data;
    }
    if (value === 'name') {
      const data = await fetchName(text);
      return data;
    }
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
