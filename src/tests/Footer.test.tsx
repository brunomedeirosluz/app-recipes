import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

test('Renderiza o componente Footer corretamente', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );

  const footerElement = getByTestId('footer');
  const drinksButton = getByTestId('drinks-bottom-btn');
  const mealsButton = getByTestId('meals-bottom-btn');

  expect(footerElement).toBeInTheDocument();
  expect(drinksButton).toBeInTheDocument();
  expect(mealsButton).toBeInTheDocument();
});

test('Verifica se os links de navegação estão corretos drinks', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );

  const drinksButton = getByTestId('drinks-bottom-btn');

  fireEvent.click(drinksButton);

  expect(window.location.pathname).toBe('/drinks');
});

test('Verifica se os links de navegação estão corretos meals', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );

  const mealsButton = getByTestId('meals-bottom-btn');

  fireEvent.click(mealsButton);

  expect(window.location.pathname).toBe('/meals');
});
