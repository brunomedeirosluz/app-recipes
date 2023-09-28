import { useEffect, useState, useContext } from 'react';
import { fetchName, fetchCategory } from '../services/FetchAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import GlobalContext from '../context/GlobalContext';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type Category = {
  strCategory: string;
};

function Meals() {
  const [recipesMeals, setRecipesMeals] = useState<Recipe[]>([]);
  const { dataApi } = useContext(GlobalContext);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchName('');
        if (response.meals && response.meals.length > 0) {
          setRecipesMeals(response.meals.slice(0, 12));
        }
      } catch (error) {
        console.error('Erro ao carregar as receitas:', error);
      }
    };
    loadRecipes();
  }, [dataApi]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategory();
        if (response.meals && response.meals.length > 0) {
          setCategories(response.meals.slice(0, 5));
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <Header pageTitle="Meals" showSearchIcon />
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      {dataApi.meals && dataApi.meals.length === 0
        && recipesMeals.map((recipe, index) => (
          <div className="recipe-card" key={ recipe.idMeal }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            </div>
          </div>
        ))}
      {dataApi.meals && dataApi.meals.length !== 1 && <Recipes />}
      <Footer />
    </div>
  );
}

export default Meals;
