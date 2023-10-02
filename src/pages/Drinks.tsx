import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchNameDrinks, fetchCategoryDrinks,
  fetchByCategoryDrink } from '../services/FetchAPIDrinks';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

type RecipeDrinks = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type Category = {
  strCategory: string;
};

function Drinks() {
  const [recipesDrinks, setRecipesDrinks] = useState<RecipeDrinks[]>([]);
  const { dataApi, setDataApi } = useContext(GlobalContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchNameDrinks('');
        if (response.drinks && response.drinks.length > 0) {
          setRecipesDrinks(response.drinks.slice(0, 12));
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
        const response = await fetchCategoryDrinks();
        if (response.drinks && response.drinks.length > 0) {
          setCategories(response.drinks.slice(0, 5));
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName: string) => {
    if (categoryName === selectedCategory || categoryName === 'all') {
      setDataApi({ meals: [], drinks: [] });
      setSelectedCategory('all');
    } else {
      try {
        const response = await fetchByCategoryDrink(categoryName);
        setDataApi(response);
        setSelectedCategory(categoryName);
      } catch (error) {
        console.error('Erro ao carregar receitas filtradas:', error);
      }
    }
  };

  return (
    <div>
      <Header pageTitle="Drinks" showSearchIcon />
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
      {dataApi.drinks && dataApi.drinks.length === 0
        && recipesDrinks.map((recipe, index) => (
          <Link key={ recipe.idDrink } to={ `/drinks/${recipe.idDrink}` }>
            <div className="recipe-card" key={ recipe.idDrink }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              </div>
            </div>
          </Link>
        ))}
      {dataApi.drinks && <Recipes />}
      <Footer />
    </div>
  );
}

export default Drinks;
