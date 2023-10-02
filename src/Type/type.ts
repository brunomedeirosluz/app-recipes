export type HeaderType = Record<string, string>;

export type RecipeType = {
  id: string;
  name: string;
  alternateName: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  tags: string;
  youtube: string;
  ingredients: Array<{
    ingredient: string;
    measure: string;
  }>;
  source: string;
  imageSource: string;
  creativeCommonsConfirmed: string;
  dateModified: string;
};

export type RecipesType = {
  recipes: Array<RecipeType>;
};

export type MealType = {
  [key: string]: string
  idMeal: string
  strMeal: string
  strDrinkAlternate: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string
  strYoutube: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strIngredient16: string
  strIngredient17: string
  strIngredient18: string
  strIngredient19: string
  strIngredient20: string
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  strMeasure16: string
  strMeasure17: string
  strMeasure18: string
  strMeasure19: string
  strMeasure20: string
  strSource: string
  strImageSource: string
  strCreativeCommonsConfirmed: string
  dateModified: string
};
export type DrinkType = {
  [key: string]: string
  idDrink: string
  strDrink: string
  strDrinkAlternate: string
  strTags: string
  strVideo: string
  strCategory: string
  strIBA: string
  strAlcoholic: string
  strGlass: string
  strInstructions: string
  strInstructionsZH_HANS: string
  strInstructionsZH_HANT: string
  strDrinkThumb: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  strImageSource: string
  strImageAttribution: string
  strCreativeCommonsConfirmed: string
  dateModified: string
};

export type DrinksType = {
  drinks: Array<DrinkType>;
};

export type DataType = {
  meals: MealType[];
  drinks: DrinkType[];
};

export type ContextType = {
  dataApi: DataType;
  setDataApi: (state: DataType) => void;
};

export type DoneRecipesType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: [];
};

export type FavoriteRecipesType = {
  id: number,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string,
};
