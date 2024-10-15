import { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { Row, Col } from "react-bootstrap";

function Recipes(): JSX.Element {
  const { dataApi } = useContext(GlobalContext);

  const recipes = dataApi?.meals || dataApi?.drinks;

  return (
    <div>
      <Row>
        {recipes.slice(0, 12).map((recipe, index) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={recipe.idMeal || recipe.idDrink}
            className="mb-4">
            <Link
              to={
                recipe.idMeal
                  ? `/meals/${recipe.idMeal}`
                  : `/drinks/${recipe.idDrink}`
              }>
              <div
                className="recipe-card text-center p-2 border rounded"
                data-testid={`${index}-recipe-card`}>
                <img
                  src={recipe.strMealThumb || recipe.strDrinkThumb}
                  alt={`${recipe.strMeal || recipe.strDrink}-img`}
                  className="img-fluid rounded"
                  data-testid={`${index}-card-img`}
                />
                <p data-testid={`${index}-card-name`} className="mt-2">
                  {recipe.strMeal || recipe.strDrink}
                </p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Recipes;
