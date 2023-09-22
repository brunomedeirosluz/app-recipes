import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helps/renderWithRouter';

test('O botão deve estar desativado se o email e a senha forem inválidos', async () => {
  renderWithRouter(
    <App />,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginSubmitButton = screen.getByTestId('login-submit-btn');

  expect(loginSubmitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
  fireEvent.change(passwordInput, { target: { value: 'senhaSegura' } });

  expect(loginSubmitButton).toBeEnabled();

  fireEvent.click(loginSubmitButton);

  await screen.findByTestId('meals-heading');
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
