import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileComponent from '../components/Profile';

const localStorageMock = {
  getItem: () => '{"email":"test@example.com"}',
};

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

test('Exibe o email do usuário', () => {
  render(
    <BrowserRouter>
      <ProfileComponent />
    </BrowserRouter>,
  );

  const emailElement = screen.getByTestId('profile-email');
  expect(emailElement).toHaveTextContent('test@example.com');
});

test('Exibe mensagem "Email not found" se o email não estiver no localStorage', () => {
  localStorageMock.getItem = () => '';
  render(
    <BrowserRouter>
      <ProfileComponent />
    </BrowserRouter>,
  );
  const emailElement = screen.getByTestId('profile-email');
  expect(emailElement).toHaveTextContent('Email not found');
});

test('Redireciona para a página de receitas concluídas quando "Done Recipes" é clicado', () => {
  render(
    <BrowserRouter>
      <ProfileComponent />
    </BrowserRouter>,
  );
  const doneRecipesButton = screen.getByTestId('profile-done-btn');
  fireEvent.click(doneRecipesButton);
  expect(window.location.pathname).toBe('/done-recipes');
});

test('Exibe todos os botões', () => {
  render(
    <BrowserRouter>
      <ProfileComponent />
    </BrowserRouter>,
  );
  const doneRecipesButton = screen.getByTestId('profile-done-btn');
  const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
  const logoutButton = screen.getByTestId('profile-logout-btn');
  expect(doneRecipesButton).toBeInTheDocument();
  expect(favoriteRecipesButton).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();
});
