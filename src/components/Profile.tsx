import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { Container, Row, Col, Button } from "react-bootstrap";

function ProfileComponent() {
  const [user, setUser] = useState({ email: "" });
  const navigate = useNavigate();

  const handleClickRecipes = () => {
    navigate("/done-recipes");
  };

  const handleClickFavorite = () => {
    navigate("/favorite-recipes");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Container
      className="my-4 d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}>
      <h3 data-testid="profile-email" className="text-primary text-center mb-4">
        {user.email || "Email not found"}
      </h3>

      <Row className="w-100">
        <Col xs={12} className="mb-2">
          <Button
            onClick={handleClickRecipes}
            data-testid="profile-done-btn"
            variant="warning"
            className="w-100">
            Done Recipes
          </Button>
        </Col>

        <Col xs={12} className="mb-2">
          <Button
            onClick={handleClickFavorite}
            data-testid="profile-favorite-btn"
            variant="warning"
            className="w-100">
            Favorite Recipes
          </Button>
        </Col>

        <Col xs={12}>
          <Button
            data-testid="profile-logout-btn"
            onClick={handleLogout}
            variant="danger"
            className="w-100">
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileComponent;
