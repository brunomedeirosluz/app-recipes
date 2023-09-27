export const fetchIngredient = async (ingredient: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  console.log(data);
};

export const fetchName = async (name: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const fetchFirstLetter = async (letter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data;
};

export const fetchFirstLetterDrinks = async (letter: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data;
};

export const fetchApi = async (link: string) => {
  const response = await fetch(link);
  const data = await response.json();
  return data;
};
// // Exemplo de uso para buscar ingredientes de drinks
// const ingredient = 'gin';
// const ingredientData = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=', ingredient);

// // Exemplo de uso para buscar drinks pelo nome
// const drinkName = 'Margarita';
// const drinkData = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', drinkName);

// // Exemplo de uso para buscar drinks pela primeira letra
// const letter = 'A';
// const letterData = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=', letter);
