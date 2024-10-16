import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  fetchName,
  fetchCategory,
  fetchByCategoryMeal,
} from "../services/FetchAPI";
import GlobalContext from "../context/GlobalContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Recipes from "../components/Recipes";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Meals.css";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchName("");
        if (response.meals && response.meals.length > 0) {
          setRecipesMeals(response.meals.slice(0, 12));
        }
      } catch (error) {
        console.error("Erro ao carregar as receitas:", error);
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
        console.error("Erro ao carregar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName: string) => {
    if (categoryName === selectedCategory || categoryName === "all") {
      console.log(selectedCategory);
      console.log(categoryName);
      setDataApi({ meals: [], drinks: [] });
      setSelectedCategory("all");
    } else {
      try {
        const response = await fetchByCategoryMeal(categoryName);
        setDataApi(response);
        console.log(response);
        setSelectedCategory(categoryName);
      } catch (error) {
        console.error("Erro ao carregar receitas filtradas:", error);
      }
    }
  };

  return (
    <>
      <Header pageTitle="Meals" showSearchIcon />
      <Container className="my-4">
        {/* Botões de Categoria */}
        <div className="category-buttons d-flex justify-content-center mb-4 flex-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-center m-2"
              onClick={() => handleCategoryClick(category.strCategory)}
              data-testid={`${category.strCategory}-category-filter`}
              style={{ cursor: "pointer" }}>
              <img
                src={`src/${category.strCategory}.png`}
                alt={category.strCategory}
                className="category-icon img-fluid"
              />
            </div>
          ))}
          <div
            className="text-center m-2"
            onClick={() => handleCategoryClick("all")}
            data-testid="All-category-filter"
            style={{ cursor: "pointer" }}>
            <img
              src="src/All.png"
              alt="All"
              className="category-icon img-fluid"
            />
          </div>
        </div>

        {/* Cards de Receitas */}
        <Row>
          {dataApi.meals &&
            dataApi.meals.length === 0 &&
            recipesMeals.map((recipe, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={recipe.idMeal}
                className="mb-4">
                <Link to={`/meals/${recipe.idMeal}`}>
                  <div className="recipe-card text-center m-2 p-2 border rounded">
                    <div data-testid={`${index}-recipe-card`}>
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        data-testid={`${index}-card-img`}
                        className="img-fluid rounded"
                      />
                      <p data-testid={`${index}-card-name`} className="mt-2">
                        {recipe.strMeal}
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
        </Row>

        {dataApi.meals && <Recipes />}
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}
export default Meals;
