import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchName, fetchCategory, fetchByCategoryMeal } from '../services/FetchAPI';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

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
  const { dataApi, setDataApi } = useContext(GlobalContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const handleCategoryClick = async (categoryName: string) => {
    if (categoryName === selectedCategory) {
      setDataApi({ meals: [], drinks: [] });
      setSelectedCategory('all');
    } else {
      try {
        const response = await fetchByCategoryMeal(categoryName);
        setDataApi(response);
        console.log(response);
        setSelectedCategory(categoryName);
      } catch (error) {
        console.error('Erro ao carregar receitas filtradas:', error);
      }
    }
  };

  return (
    <div>
      <Header pageTitle="Meals" showSearchIcon />
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleCategoryClick(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          onClick={ () => handleCategoryClick('all') }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      {dataApi.meals && dataApi.meals.length === 0
        && recipesMeals.map((recipe, index) => (
          <Link key={ recipe.idMeal } to={ `/meals/${recipe.idMeal}` }>
            <div className="recipe-card">
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
              </div>
            </div>
          </Link>
        ))}
      {dataApi.meals && <Recipes />}
      <Footer />
    </div>
  );
}
export default Meals;
