import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('O botão deve estar desativado se o email for inválido', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const loginSubmitButton = getByTestId('login-submit-btn');

  fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
  fireEvent.change(passwordInput, { target: { value: 'senhaSegura' } });

  expect(loginSubmitButton).toBeDisabled();
});

test('O botão deve estar ativado se o email e a senha forem válidos', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const loginSubmitButton = getByTestId('login-submit-btn');

  fireEvent.change(emailInput, { target: { value: 'email@exemplo.com' } });
  fireEvent.change(passwordInput, { target: { value: 'senhaSegura' } });

  expect(loginSubmitButton).toBeEnabled();
});

test('Verifica a cobertura de 45% da tela de Login', () => {
  const { container } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  expect(container).toMatchSnapshot();
});
