import { fetchIngredientDrinks, fetchNameDrinks, fetchFirstLetterDrinks, fetchByCategoryDrink } from '../services/FetchAPIDrinks';

describe('fetchIngredientDrinks', () => {
  test('testar o fetchIngredientDrinks', async () => {
    const ingredient = 'gin';
    const data = await fetchIngredientDrinks(ingredient);

    expect(data.drinks).toBeDefined();
    expect(data.drinks.length).toBeGreaterThan(0);

    data.drinks.forEach((drink : any) => {
      expect(drink.strDrink).toBeDefined();
      expect(drink.strDrinkThumb).toBeDefined();
      expect(drink.idDrink).toBeDefined();
    });
  });
});

describe('fetchNameDrinks', () => {
  test('testar o fetchNameDrinks', async () => {
    const name = 'gin';
    const data = await fetchNameDrinks(name);

    expect(data.drinks).toBeDefined();
    expect(data.drinks.length).toBeGreaterThan(0);

    data.drinks.forEach((drink : any) => {
      expect(drink.strDrink).toBeDefined();
      expect(drink.strDrinkThumb).toBeDefined();
      expect(drink.idDrink).toBeDefined();
    });
  });
});

describe('fetchFirstLetterDrinks', () => {
  test('testar o fetchFirstLetterDrinks', async () => {
    const letter = 'a';
    const data = await fetchFirstLetterDrinks(letter);

    expect(data.drinks).toBeDefined();
    expect(data.drinks.length).toBeGreaterThan(0);

    data.drinks.forEach((drink : any) => {
      expect(drink.strDrink).toBeDefined();
      expect(drink.strDrinkThumb).toBeDefined();
      expect(drink.idDrink).toBeDefined();
    });
  });
});

describe('fetchByCategoryDrink', () => {
  test('testar o fetchByCategoryDrink', async () => {
    const category = 'shake';
    const data = await fetchByCategoryDrink(category);

    expect(data.drinks).toBeDefined();
    expect(data.drinks.length).toBeGreaterThan(0);

    data.drinks.forEach((drink : any) => {
      expect(drink.strDrink).toBeDefined();
      expect(drink.strDrinkThumb).toBeDefined();
      expect(drink.idDrink).toBeDefined();
    });
  });
});
