export const fetchIngredientDrinks = async (ingredient: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  return data;
};

export const fetchNameDrinks = async (name: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await response.json();
  return data;
};

export const fetchFirstLetterDrinks = async (letter: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
  );
  const data = await response.json();
  return data;
};

export const fetchCategoryDrinks = async () => {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
  );
  const data = await response.json();
  return data;
};

export const fetchByCategoryDrink = async (category: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();
  return data;
};

export const fetchRecipeDrink = async (id: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  return data;
};
