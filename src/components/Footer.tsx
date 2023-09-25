import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="Ícone de Bebida" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } data-testid="meals-bottom-btn" alt="Ícone de Talheres" />
      </Link>
    </footer>
  );
}

export default Footer;
