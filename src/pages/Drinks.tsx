import { useEffect, useState, useContext } from 'react';
import { fetchNameDrinks, fetchCategoryDrinks } from '../services/FetchAPIDrinks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import GlobalContext from '../context/GlobalContext';

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
  const { dataApi } = useContext(GlobalContext);
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <div>
      <Header pageTitle="Drinks" showSearchIcon />
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
      {dataApi.drinks && dataApi.drinks.length === 0
        && recipesDrinks.map((recipe, index) => (
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
        ))}
      {dataApi.drinks && dataApi.drinks.length !== 0 && <Recipes />}
      <Footer />
    </div>
  );
}

export default Drinks;
