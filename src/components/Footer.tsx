import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";
import drinkIcon from "../assets/icone-drink.png";
import foodIcon from "../assets/icone-prato.png";

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Container>
        <Row className="justify-content-around">
          <Col xs={6} md={4} className="text-center">
            <Link to="/drinks">
              <img
                src={drinkIcon}
                data-testid="drinks-bottom-btn"
                alt="Ícone de Bebida"
                className="footer-icon"
              />
            </Link>
          </Col>
          <Col xs={6} md={4} className="text-center">
            <Link to="/meals">
              <img
                src={foodIcon}
                data-testid="meals-bottom-btn"
                alt="Ícone de Talheres"
                className="footer-icon"
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
