export function FilterIngredients(data: any) {
  const ingredients = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith('strIngredient') && data[key]) {
      const ingredientNumber = key.replace('strIngredient', '');
      const measureKey = `strMeasure${ingredientNumber}`;
      const ingredient = data[key] as string;
      const measure = data[measureKey] as string;
      acc.push({ ingredient, measure });
    }
    return acc;
  }, [] as { ingredient: string; measure: string | null }[]);
  return ingredients;
}
