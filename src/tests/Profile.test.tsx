import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileComponent from '../components/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/Favorite-recipes';
import Login from '../pages/Login';

test('testes da pagina de Profile', async () => {
  render(
    <BrowserRouter>
      <ProfileComponent />
    </BrowserRouter>,
  );
  const h2 = screen.getByTestId('profile-email');
  const buttonDone = screen.getByTestId('profile-done-btn');
  const buttonFavorite = screen.getByTestId('profile-favorite-btn');
  const buttonLogout = screen.getByTestId('profile-logout-btn');

  expect(h2).toBeInTheDocument();
  expect(buttonDone).toBeInTheDocument();
  expect(buttonFavorite).toBeInTheDocument();
  expect(buttonLogout).toBeInTheDocument();

  await userEvent.click(buttonDone);
  render(
    <BrowserRouter>
      <DoneRecipes />
    </BrowserRouter>,
  );

  await userEvent.click(buttonFavorite);
  render(
    <BrowserRouter>
      <FavoriteRecipes />
    </BrowserRouter>,
  );
  await userEvent.click(buttonLogout);
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
});
test('should show the user email when present in localStorage', () => {
  const user = { email: 'email@mail.com' };
  localStorage.setItem('user', JSON.stringify(user));

  render(
    <BrowserRouter>
      <ProfileComponent />
    </BrowserRouter>,
  );

  const emailElement = screen.getByTestId('profile-email');
  expect(emailElement).toBeInTheDocument();
  expect(emailElement).toHaveTextContent(user.email);
});
