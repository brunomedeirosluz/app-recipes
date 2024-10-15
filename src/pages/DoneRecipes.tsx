import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DoneRecipesType } from "../Type/type";
import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/DoneRecipes.css";

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [copyIndex, setCopyIndex] = useState<number | null>(null);
  const [recipeFilter, setRecipeFilter] = useState("all");

  useEffect(() => {
    const storedRecipes = JSON.parse(
      localStorage.getItem("doneRecipes") || "[]"
    );
    setDoneRecipes(storedRecipes);
  }, []);

  const filteredRecipes = doneRecipes.filter((recipe) => {
    if (recipeFilter === "all") return true;
    return recipe.type === recipeFilter;
  });

  const handleCopyLink = (id: string, type: string, index: number) => {
    const recipeURL = `${window.location.origin}/${type}s/${id}`;

    navigator.clipboard
      .writeText(recipeURL)
      .then(() => {
        setCopyIndex(index);
        setTimeout(() => {
          setCopyIndex(null);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying link:", error);
      });
  };

  console.log(JSON.parse(localStorage.getItem("doneRecipes") || "[]"));

  return (
    <div>
      <Header pageTitle="Done Recipes" showSearchIcon={false} />
      <Container className="my-4">
        <div className="filter-buttons d-flex justify-content-center mb-4">
          {/* Seus botões de filtro */}
        </div>

        <Row>
          {filteredRecipes.map((recipe, index) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              className="mb-4 d-flex">
              <div className="recipe-card d-flex flex-column text-center p-3 border rounded flex-grow-1">
                <Link to={`/${recipe.type}s/${recipe.id}`}>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    data-testid={`${index}-horizontal-image`}
                    className="img-fluid img"
                  />
                </Link>

                <Link to={`/${recipe.type}s/${recipe.id}`}>
                  <p data-testid={`${index}-horizontal-name`} className="mt-2">
                    {recipe.name}
                  </p>
                </Link>

                <p data-testid={`${index}-horizontal-top-text`}>
                  {recipe.type === "meal"
                    ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot}
                </p>

                <p data-testid={`${index}-horizontal-done-date`}>
                  {recipe.doneDate}
                </p>

                <button
                  onClick={() => handleCopyLink(recipe.id, recipe.type, index)}
                  className="btn p-0">
                  <img
                    src="src/images/Share.png"
                    alt="Share"
                    data-testid={`${index}-horizontal-share-btn`}
                  />
                </button>

                {copyIndex === index && <p>Link copied!</p>}

                <div className="mt-auto">
                  {recipe.tags.map((tag, tagIndex) => (
                    <p
                      key={tagIndex}
                      data-testid={`${index}-${tag}-horizontal-tag`}>
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default DoneRecipes;
