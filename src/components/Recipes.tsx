import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchApi, fetchFirstLetterDrinks } from '../services/FetchAPI';
import GlobalContext from '../context/GlobalContext';
import { DrinkType, MealType } from '../Type/type';

function Recipes() {
  const { dataApi, setDataApi } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const location = useLocation();
  const path = location.pathname.replace(/^\/+/g, '');

  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/';

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = path === 'meals'
        ? urlMeals
        : urlDrink;
      console.log(baseUrl);

      // const searchUrl = 'search.php?s=';

      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      // return data;

      // const data = await fetchApi(`${baseUrl}${searchUrl}`);
      const slicedData = data[`${path}`].slice(0, 12); // Limitar a 12 receitas
      setDataApi({ ...dataApi, [path]: slicedData });
      const categoriesData = await fetchApi(`${baseUrl}list.php?c=list`);
      setCategories(categoriesData[`${path}`].slice(0, 5));
    };

    fetchData();
  }, [path]);

  const handleFilterByCategory = async (category: string) => {
    if (selectedOption === category) {
      setSelectedOption(null);
      removeAllFilters();
    } else {
      setSelectedOption(category);
      const baseUrl = path === 'meals'
        ? urlMeals
        : urlDrink;

      const filterUrl = `filter.php?c=${category}`;
      const data = await fetchFirstLetterDrinks(`${baseUrl}${filterUrl}`);
      const slicedData = data[`${path}`].slice(0, 12); // Limitar a 12 receitas
      setDataApi({ ...dataApi, [path]: slicedData });
    }
  };

  const removeAllFilters = async () => {
    const baseUrl = path === 'meals'
      ? urlMeals
      : urlDrink;

    const searchUrl = 'search.php?s=';
    const data = await fetchFirstLetterDrinks(`${baseUrl}${searchUrl}`);
    const slicedData = data[`${path}`].slice(0, 12); // Limitar a 12 receitas
    setDataApi({ ...dataApi, [path]: slicedData });
  };

  return (
    <div>
      {categories.map(({ strCategory }) => (
        <label key={ strCategory }>
          <input
            type="radio"
            name="categories"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleFilterByCategory(strCategory) }
            checked={ selectedOption === strCategory }
          />
          {strCategory}
        </label>
      ))}

      <button
        data-testid="All-category-filter"
        onClick={ removeAllFilters }
      >
        All
      </button>

      {/* {(path === 'drinks')
        && dataApi.drinks.map((recipe: DrinkType, index: number) => (
          <Link key={ recipe.idDrink } to={ `/${path}/${recipe.idDrink}` }>
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <p data-testid={ `${index}-card-name` }>{ recipe.strDrink }</p>
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        ))}

      {(path === 'meals')
        && dataApi.meals.map((recipe: MealType, index: number) => (
          <Link key={ recipe.idMeal } to={ `/${path}/${recipe.idMeal}` }>
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        ))} */}
    </div>
  );
}

export default Recipes;
