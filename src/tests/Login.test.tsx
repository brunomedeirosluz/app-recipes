import { BrowserRouter } from 'react-router-dom';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import Login from '../pages/Login';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT = 'login-submit-btn';

test('O botão deve estar desativado se o email e a senha forem inválidos', async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const emailInput = screen.getByTestId(EMAIL_INPUT);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT);
  const loginSubmitButton = screen.getByTestId(LOGIN_SUBMIT);

  expect(loginSubmitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'safasfasdf' } });
  fireEvent.change(passwordInput, { target: { value: 'teste' } });

  expect(loginSubmitButton).toBeDisabled();
});

test('O botão deve estar ativado se o email e a senha forem válidos', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const emailInput = screen.getByTestId(EMAIL_INPUT);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT);
  const loginSubmitButton = screen.getByTestId(LOGIN_SUBMIT);

  fireEvent.change(emailInput, { target: { value: 'email@exemplo.com' } });
  fireEvent.change(passwordInput, { target: { value: 'senhaSegura' } });

  expect(loginSubmitButton).toBeEnabled();
});

test('O botão deve direcionar para rota /meals', async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const emailInput = screen.getByTestId(EMAIL_INPUT);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT);
  const loginSubmitButton = screen.getByTestId(LOGIN_SUBMIT);

  expect(loginSubmitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
  fireEvent.change(passwordInput, { target: { value: 'senhaSegura' } });

  expect(loginSubmitButton).toBeEnabled();

  fireEvent.click(loginSubmitButton);

  await waitFor(() => {
    expect(window.location.pathname).toBe('/meals');
  });
});
