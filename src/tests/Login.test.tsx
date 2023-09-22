import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helps/renderWithRouter';

test.only('O botão deve estar desativado se o email e a senha forem inválido', async () => {
  const { user } = renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginSubmitButton = screen.getByTestId('login-submit-btn');

  expect(loginSubmitButton).toBeDisabled();

  await fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
  await fireEvent.change(passwordInput, { target: { value: 'senhaSegura' } });

  expect(loginSubmitButton).toBeInTheDocument();

  await user.click(loginSubmitButton);

  const meals = await screen.getByRole('heading', { name: /meals page/i });
  expect(meals).toBeInTheDocument();
});

test('O botão deve estar ativado se o email e a senha forem válidos', () => {
  renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginSubmitButton = screen.getByTestId('login-submit-btn');

  fireEvent.change(emailInput, { target: { value: 'email@exemplo.com' } });
  fireEvent.change(passwordInput, { target: { value: 'senhaSegura' } });

  expect(loginSubmitButton).toBeEnabled();
});
