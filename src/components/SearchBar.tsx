function SearchBar() {
  return (
    <form>
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
      />
      <input
        type="radio"
        name="radio"
        id="ingredient"
        value="ingredient"
        data-testid="ingredient-search-radio"
      />
      <label htmlFor="ingredient">Ingredient</label>

      <input
        type="radio"
        name="radio"
        id="name"
        value="name"
        data-testid="name-search-radio"
      />
      <label htmlFor="name">Name</label>

      <input
        type="radio"
        name="radio"
        id="first letter"
        value="first letter"
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
