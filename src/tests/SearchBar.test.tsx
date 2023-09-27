import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

test('Renderiza os componentes de SearchBar', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );
  const searchInput = getByTestId(SEARCH_INPUT);
  const ingredientRadio = getByTestId('ingredient-search-radio');
  const nameRadio = getByTestId('name-search-radio');
  const firstLetterRadio = getByTestId('first-letter-search-radio');
  const execSearchBtn = getByTestId(EXEC_SEARCH_BTN);

  expect(searchInput).toBeInTheDocument();
  expect(ingredientRadio).toBeInTheDocument();
  expect(nameRadio).toBeInTheDocument();
  expect(firstLetterRadio).toBeInTheDocument();
  expect(execSearchBtn).toBeInTheDocument();
});

test('Executa uma pesquisa ao clicar no botão SEARCH', async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );

  const searchInput = getByTestId(SEARCH_INPUT);
  const execSearchBtn = getByTestId(EXEC_SEARCH_BTN);

  fireEvent.change(searchInput, { target: { value: 'chicken' } });
  fireEvent.click(execSearchBtn);
  await waitFor(() => {
  });
});
test('Seleciona a opção "Ingredient" e verifica se o valor do estado é atualizado corretamente', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );

  const ingredientRadio = getByTestId('ingredient-search-radio');
  const searchInput = getByTestId(SEARCH_INPUT);

  fireEvent.click(ingredientRadio);

  expect(searchInput).toHaveValue('');
  expect(searchInput).toBeEnabled();
  expect(searchInput).toBeInTheDocument();
});
test('Seleciona a opção "First letter" e verifica se o valor do estado é atualizado corretamente', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );

  const firstLetterRadio = getByTestId('first-letter-search-radio');
  const searchInput = getByTestId(SEARCH_INPUT);

  fireEvent.click(firstLetterRadio);

  expect(searchInput).toHaveValue('');
  expect(searchInput).toBeEnabled();
  expect(searchInput).toBeInTheDocument();
});
test('Verifica se a pesquisa não é executada ao clicar em "SEARCH" com campo de pesquisa vazio', async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );

  const execSearchBtn = getByTestId(EXEC_SEARCH_BTN);

  fireEvent.click(execSearchBtn);
});
test('Verifica se a pesquisa é executada corretamente ao selecionar "Name" e inserir um valor válido', async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );

  const nameRadio = getByTestId('name-search-radio');
  const searchInput = getByTestId('search-input');
  const execSearchBtn = getByTestId('exec-search-btn');

  fireEvent.click(nameRadio);
  fireEvent.change(searchInput, { target: { value: 'Pizza' } });
  fireEvent.click(execSearchBtn);

  await waitFor(() => {
  });
});
