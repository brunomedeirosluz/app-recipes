import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Recipes(): JSX.Element {
  const { dataApi } = useContext(GlobalContext);

  const recipes = dataApi?.meals || dataApi?.drinks || [];

  return (
    <div>
      {recipes.slice(0, 12).map((recipe, index) => (
        <div
          className="recipe-card"
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ `${recipe.strMeal || recipe.strDrink}-img` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
