import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavoriteRecipesType } from "../Type/type";
import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/FavoriteRecipes.css";
import allFoods from "../assets/all-2.png";
import foods from "../assets/foods.png";
import drinks from "../assets/drinks.png";
import heart from "../assets/heart.png";
import share from "../assets/Share.png";

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<FavoriteRecipesType[]>([]);
  const [filter, setFilter] = useState("all");
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteRecipes") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleFilterChange = (type: any) => {
    setFilter(type);
  };

  const handleCopyLink = async (id: any, type: any, index: any) => {
    const recipeUrl = `${window.location.origin}/${type}s/${id}`;
    try {
      await navigator.clipboard.writeText(recipeUrl);
      setCopyIndex(index);
      setTimeout(() => {
        setCopyIndex(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleRemoveFavorite = (id: any) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const filteredFavorites =
    filter === "all"
      ? favorites
      : favorites.filter((recipe) => recipe.type === filter);

  return (
    <div>
      <Header pageTitle="Favorite Recipes" showSearchIcon={false} />
      <Container className="my-4">
        <div className="filter-buttons d-flex justify-content-center mb-4">
          <a
            onClick={() => handleFilterChange("all")}
            style={{ cursor: "pointer" }}
            className="mx-2"
            data-testid="filter-by-all-btn">
            <img src={allFoods} alt="logo-all-foods" />
          </a>
          <a
            onClick={() => handleFilterChange("meal")}
            style={{ cursor: "pointer" }}
            className="mx-2"
            data-testid="filter-by-meal-btn">
            <img src={foods} alt="logo-food" />
          </a>
          <a
            onClick={() => handleFilterChange("drink")}
            style={{ cursor: "pointer" }}
            className="mx-2"
            data-testid="filter-by-drink-btn">
            <img src={drinks} alt="logo-food" />
          </a>
        </div>

        {filteredFavorites.length > 0 ? (
          <Row>
            {filteredFavorites.map((recipe, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={recipe.id}
                className="mb-4">
                <div className="recipe-card text-center">
                  <Link to={`/${recipe.type}s/${recipe.id}`}>
                    <img
                      data-testid={`${index}-horizontal-image`}
                      src={recipe.image}
                      alt={recipe.name}
                      className="img-fluid" // Responsividade
                    />
                    <h4 data-testid={`${index}-horizontal-name`}>
                      {recipe.name}
                    </h4>
                  </Link>

                  <div className="recipe-info d-flex justify-content-between align-items-center">
                    <p data-testid={`${index}-horizontal-top-text`}>
                      {recipe.type === "meal"
                        ? `${recipe.nationality} - ${recipe.category}`
                        : recipe.alcoholicOrNot}
                    </p>

                    <a
                      data-testid={`btn-favorite${index}`}
                      onClick={() => handleRemoveFavorite(recipe.id)}>
                      <img
                        data-testid={`${index}-horizontal-favorite-btn`}
                        src={heart}
                        alt="Favorite"
                        style={{ width: "20px", cursor: "pointer" }}
                      />
                    </a>

                    <a
                      data-testid={`btn-Copy${index}`}
                      onClick={() =>
                        handleCopyLink(recipe.id, recipe.type, index)
                      }>
                      <img
                        data-testid={`${index}-horizontal-share-btn`}
                        src={share}
                        alt="Share"
                        style={{ width: "20px", cursor: "pointer" }}
                      />
                    </a>

                    {copyIndex === index && <p>Link copied!</p>}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No favorite recipes.</p>
        )}
      </Container>
    </div>
  );
}
