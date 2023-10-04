import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DoneRecipes from '../pages/DoneRecipes';
import { renderWithRouter } from '../helps/renderWithRouter';

beforeEach(() => {
  const doneRecipesData = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesData));
});

describe('Testando a página de Receitas Feitas', () => {
  const ID_NOME_HORIZONTAL = '0-horizontal-name';

  it('Verifica os botões de filtro e compartilhamento', async () => {
    renderWithRouter(<DoneRecipes />);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();

    const buttonShare = screen.getAllByTestId('0-horizontal-share-btn');
    expect(buttonShare.length > 0).toBe(true);

    await userEvent.click(buttonShare[0]);
    await waitFor(() => {
      const linkCopied = screen.getAllByText('Link copied!');
      expect(linkCopied.length > 0).toBe(true);
    });
  });

  it('Verifica funcionalidade dos filtros', async () => {
    renderWithRouter(<DoneRecipes />);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');

    await userEvent.click(buttonMeals);
    await waitFor(() => {
      expect(screen.getAllByTestId(ID_NOME_HORIZONTAL)[0]).toBeInTheDocument();
    });

    await userEvent.click(buttonDrinks);
    await waitFor(() => {
      expect(screen.getAllByTestId(ID_NOME_HORIZONTAL)[0]).toBeInTheDocument();
    });

    await userEvent.click(buttonAll);
    await waitFor(() => {
      expect(screen.getAllByTestId(ID_NOME_HORIZONTAL)[0]).toBeInTheDocument();
    });
  });
});
