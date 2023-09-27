import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

const SEARCH_ICON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

test('Renderiza o componente Header com título e ícone de perfil', () => {
  render(
    <BrowserRouter>
      <Header pageTitle="Test Page" showSearchIcon />
    </BrowserRouter>,
  );

  const pageTitleElement = screen.getByTestId('page-title');
  expect(pageTitleElement).toBeInTheDocument();
  expect(pageTitleElement.textContent).toBe('Test Page');

  const profileIconElement = screen.getByTestId('profile-top-btn');
  expect(profileIconElement).toBeInTheDocument();

  const searchIconElement = screen.getByTestId(SEARCH_ICON);
  expect(searchIconElement).toBeInTheDocument();
});

test('Renderiza o componente Header com título e sem ícone de pesquisa', () => {
  render(
    <BrowserRouter>
      <Header pageTitle="Test Page" showSearchIcon={ false } />
    </BrowserRouter>,
  );

  const pageTitleElement = screen.getByTestId('page-title');
  expect(pageTitleElement).toBeInTheDocument();
  expect(pageTitleElement.textContent).toBe('Test Page');

  const profileIconElement = screen.getByTestId('profile-top-btn');
  expect(profileIconElement).toBeInTheDocument();

  const searchIconElement = screen.queryByTestId(SEARCH_ICON);
  expect(searchIconElement).not.toBeInTheDocument();
});

test('Renderiza o componente Header com campo de busca ao clicar no ícone de pesquisa', () => {
  render(
    <BrowserRouter>
      <Header pageTitle="Test Page" showSearchIcon />
    </BrowserRouter>,
  );

  const searchIconElement = screen.getByTestId(SEARCH_ICON);
  expect(searchIconElement).toBeInTheDocument();

  fireEvent.click(searchIconElement);

  const searchInputElement = screen.getByTestId(SEARCH_INPUT);
  expect(searchInputElement).toBeInTheDocument();
});

test('Esconde o campo de busca ao clicar novamente no ícone de pesquisa', () => {
  render(
    <BrowserRouter>
      <Header pageTitle="Test Page" showSearchIcon />
    </BrowserRouter>,
  );

  const searchIconElement = screen.getByTestId(SEARCH_ICON);
  expect(searchIconElement).toBeInTheDocument();

  fireEvent.click(searchIconElement);

  const searchInputElement = screen.getByTestId(SEARCH_INPUT);
  expect(searchInputElement).toBeInTheDocument();

  fireEvent.click(searchIconElement);

  expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
});
