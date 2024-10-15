import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  fetchNameDrinks,
  fetchCategoryDrinks,
  fetchByCategoryDrink,
} from "../services/FetchAPIDrinks";
import GlobalContext from "../context/GlobalContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Drinks.css";
import { Container, Row, Col } from "react-bootstrap";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchNameDrinks("cocktail");
        if (response.drinks && Array.isArray(response.drinks)) {
          setRecipesDrinks(response.drinks.slice(0, 12));
          setDataApi({ meals: [], drinks: response.drinks.slice(0, 12) });
        } else {
          setRecipesDrinks([]);
        }
      } catch (error) {
        console.error("Erro ao carregar as receitas:", error);
      }
    };
    loadRecipes();
  }, [setDataApi]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoryDrinks();
        if (response.drinks && Array.isArray(response.drinks)) {
          setCategories(response.drinks.slice(0, 5));
        } else {
          setCategories([]); // Handle case with no categories
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName: string) => {
    if (categoryName === selectedCategory) {
      return;
    }

    try {
      if (categoryName === "cocktail") {
        const response = await fetchNameDrinks("");
        if (response.drinks && Array.isArray(response.drinks)) {
          setDataApi({ meals: [], drinks: response.drinks });
          setRecipesDrinks(response.drinks.slice(0, 12));
        }
      } else {
        const response = await fetchByCategoryDrink(categoryName);
        if (response.drinks && Array.isArray(response.drinks)) {
          setDataApi({ meals: [], drinks: response.drinks });
        } else {
          setDataApi({ meals: [], drinks: [] });
        }
      }
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error("Erro ao carregar receitas filtradas:", error);
    }
  };

  return (
    <div>
      <Header pageTitle="Drinks" showSearchIcon />
      <Container className="my-4">
        <div className="category-buttons d-flex justify-content-center mb-4 flex-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-center m-2"
              onClick={() => handleCategoryClick(category.strCategory)}
              data-testid={`${category.strCategory}-category-filter`}
              style={{ cursor: "pointer" }}>
              <img
                src={`src/images/${category.strCategory}.png`}
                alt={category.strCategory}
                className="category-icon"
              />
            </div>
          ))}
        </div>

        <Row>
          {dataApi.drinks && dataApi.drinks.length === 0 ? (
            recipesDrinks.length > 0 ? (
              recipesDrinks.map((recipe, index) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={recipe.idDrink}
                  className="mb-4">
                  <Link to={`/drinks/${recipe.idDrink}`}>
                    <div className="recipe-card text-center">
                      <div data-testid={`${index}-recipe-card`}>
                        <img
                          src={recipe.strDrinkThumb}
                          alt={recipe.strDrink}
                          data-testid={`${index}-card-img`}
                          className="img-fluid" // Faz com que a imagem seja responsiva
                        />
                        <p data-testid={`${index}-card-name`}>
                          {recipe.strDrink}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))
            ) : (
              <p>No recipes available.</p>
            )
          ) : (
            dataApi.drinks.map((drink, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={drink.idDrink}
                className="mb-4">
                <Link to={`/drinks/${drink.idDrink}`}>
                  <div className="recipe-card text-center m-2">
                    <div data-testid={`${index}-recipe-card`}>
                      <img
                        src={drink.strDrinkThumb}
                        alt={drink.strDrink}
                        data-testid={`${index}-card-img`}
                        className="img-fluid" // Faz com que a imagem seja responsiva
                      />
                      <p data-testid={`${index}-card-name`}>{drink.strDrink}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
