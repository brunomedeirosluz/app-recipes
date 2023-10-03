import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SearchBar from '../components/SearchBar';
import * as APIModuleMeal from '../services/FetchAPI';
import * as APIModuleDrink from '../services/FetchAPIDrinks';
import { DrinkByFirstLetter, DrinkByIngredient, DrinkByName, MealByFirstLetter, MealByIngredient, MealByName } from './mocks/SearchMocks';
import { renderWithRouter } from '../helps/renderWithRouter';
import GlobalProvider from '../context/GlobalProvider';

test('Teste se os componentes de SearchBar são renderizados na rota `/meals` ', () => {
  renderWithRouter(
    <GlobalProvider>
      <SearchBar />
    </GlobalProvider>,
    { route: '/meals' },
  );
  const searchBar = screen.getByPlaceholderText(/search/i);
  const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
  const nameRadio = screen.getByRole('radio', { name: /name/i });
  const letterRadio = screen.getByRole('radio', { name: /first letter/i });
  const execSearchBtn = screen.getByRole('button', { name: /search/i });

  expect(searchBar).toBeInTheDocument();
  expect(ingredientRadio).toBeInTheDocument();
  expect(nameRadio).toBeInTheDocument();
  expect(letterRadio).toBeInTheDocument();
  expect(execSearchBtn).toBeInTheDocument();
});

test('Teste se os componentes de SearchBar são renderizados na rota `/drinks` ', () => {
  renderWithRouter(
    <GlobalProvider>
      <SearchBar />
    </GlobalProvider>,
    { route: '/drinks' },
  );
  const searchBar = screen.getByPlaceholderText(/search/i);
  const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
  const nameRadio = screen.getByRole('radio', { name: /name/i });
  const letterRadio = screen.getByRole('radio', { name: /first letter/i });
  const execSearchBtn = screen.getByRole('button', { name: /search/i });

  expect(searchBar).toBeInTheDocument();
  expect(ingredientRadio).toBeInTheDocument();
  expect(nameRadio).toBeInTheDocument();
  expect(letterRadio).toBeInTheDocument();
  expect(execSearchBtn).toBeInTheDocument();
});

describe('Teste a chamada e retorno das APIs na rota `/meals`', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Verifica se a pesquisa é executada corretamente ao selecionar "Ingredient" e inserir um valor válido', async () => {
    const mockAPI = vi.spyOn(APIModuleMeal, 'fetchIngredient').mockResolvedValue(MealByIngredient);
    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/meals' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'tomato');
    await userEvent.click(ingredientRadio);
    await userEvent.click(execSearchBtn);

    expect(mockAPI).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalledWith('tomato');
  });

  test('Verifica se a pesquisa é executada corretamente ao selecionar "Name" e inserir um valor válido', async () => {
    const mockAPI = vi.spyOn(APIModuleMeal, 'fetchName').mockResolvedValue(MealByName);
    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/meals' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'pizza');
    await userEvent.click(nameRadio);
    await userEvent.click(execSearchBtn);

    expect(mockAPI).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalledWith('pizza');
  });

  test('Verifica se a pesquisa é executada corretamente ao selecionar "First letter" e inserir uma letra apenas', async () => {
    const mockAPI = vi.spyOn(APIModuleMeal, 'fetchFirstLetter').mockResolvedValue(MealByFirstLetter);
    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/meals' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const letterRadio = screen.getByRole('radio', { name: /first letter/i });
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'p');
    await userEvent.click(letterRadio);
    await userEvent.click(execSearchBtn);

    expect(mockAPI).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalledWith('p');
  });

  test('Verifica se exibe um alerta ao selecionar "First letter" e inserir uma letra apenas', async () => {
    vi.spyOn(APIModuleMeal, 'fetchFirstLetter').mockResolvedValue(MealByFirstLetter);
    vi.spyOn(global, 'alert');

    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/meals' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const letterRadio = screen.getByText(/first letter/i);
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'pizza');
    await userEvent.click(letterRadio);
    await userEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalled();
  });
});

describe('Teste a chamada e retorno das APIs na rota `/drinks`', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Verifica se a pesquisa é executada corretamente ao selecionar "Ingredient" e inserir um valor válido', async () => {
    const mockAPI = vi.spyOn(APIModuleDrink, 'fetchIngredientDrinks').mockResolvedValue(DrinkByIngredient);
    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/drinks' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'gin');
    await userEvent.click(ingredientRadio);
    await userEvent.click(execSearchBtn);

    expect(mockAPI).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalledWith('gin');
  });
  test('Verifica se a pesquisa é executada corretamente ao selecionar "Name" e inserir um valor válido', async () => {
    const mockAPI = vi.spyOn(APIModuleDrink, 'fetchNameDrinks').mockResolvedValue(DrinkByName);
    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/drinks' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'martini');
    await userEvent.click(nameRadio);
    await userEvent.click(execSearchBtn);

    expect(mockAPI).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalledWith('martini');
  });

  test('Verifica se a pesquisa é executada corretamente ao selecionar "First letter" e inserir uma letra apenas', async () => {
    const mockAPI = vi.spyOn(APIModuleDrink, 'fetchFirstLetterDrinks').mockResolvedValue(DrinkByFirstLetter);
    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/drinks' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const letterRadio = screen.getByRole('radio', { name: /first letter/i });
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'b');
    await userEvent.click(letterRadio);
    await userEvent.click(execSearchBtn);

    expect(mockAPI).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalledWith('b');
  });

  test('Verifica se exibe um alerta ao selecionar "First letter" e inserir mais de uma letra', async () => {
    vi.spyOn(APIModuleDrink, 'fetchFirstLetterDrinks').mockResolvedValue(DrinkByFirstLetter);
    vi.spyOn(global, 'alert');

    renderWithRouter(
      <GlobalProvider>
        <SearchBar />
      </GlobalProvider>,
      { route: '/drinks' },
    );

    const searchBar = screen.getByPlaceholderText(/search/i);
    const letterRadio = screen.getByText(/first letter/i);
    const execSearchBtn = screen.getByRole('button', { name: /search/i });

    expect(searchBar).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'blue');
    await userEvent.click(letterRadio);
    await userEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalled();
  });
});
