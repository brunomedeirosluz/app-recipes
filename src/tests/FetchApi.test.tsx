import { fetchIngredient, fetchName, fetchFirstLetter, fetchByCategoryMeal } from '../services/FetchAPI';

describe('fetchIngredient', () => {
  test('testar o fetchIngredient', async () => {
    const ingredient = 'chicken';
    const data = await fetchIngredient(ingredient);

    expect(data.meals).toBeDefined();
    expect(data.meals.length).toBeGreaterThan(0);

    data.meals.forEach((meal : any) => {
      expect(meal.strMeal).toBeDefined();
      expect(meal.strMealThumb).toBeDefined();
      expect(meal.idMeal).toBeDefined();
    });
  });
});

describe('fetchName', () => {
  test('testar o fetchName', async () => {
    const name = 'corba';
    const data = await fetchName(name);

    expect(data.meals).toBeDefined();
    expect(data.meals.length).toBeGreaterThan(0);

    data.meals.forEach((meal : any) => {
      expect(meal.strMeal).toBeDefined();
      expect(meal.strMealThumb).toBeDefined();
      expect(meal.idMeal).toBeDefined();
    });
  });
});

describe('fetchFirstLetter', () => {
  test('testar o fetchFirstLetter', async () => {
    const latter = 'a';
    const data = await fetchFirstLetter(latter);

    expect(data.meals).toBeDefined();
    expect(data.meals.length).toBeGreaterThan(0);

    data.meals.forEach((meal : any) => {
      expect(meal.strMeal).toBeDefined();
      expect(meal.strMealThumb).toBeDefined();
      expect(meal.idMeal).toBeDefined();
    });
  });
});

describe('fetchByCategoryMeal', () => {
  test('testar o fetchByCategoryMeal', async () => {
    const category = 'beef';
    const data = await fetchByCategoryMeal(category);

    expect(data.meals).toBeDefined();
    expect(data.meals.length).toBeGreaterThan(0);

    data.meals.forEach((meal : any) => {
      expect(meal.strMeal).toBeDefined();
      expect(meal.strMealThumb).toBeDefined();
      expect(meal.idMeal).toBeDefined();
    });
  });
});
