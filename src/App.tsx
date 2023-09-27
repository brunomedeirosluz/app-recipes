import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';
import MealProgress from './pages/MealsProgress';
import DrinksProgress from './pages/DrinksProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/Done-recipes';
import FavoriteRecipes from './pages/Favorite-recipes';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals/:id/in-progress" element={ <MealProgress /> } />
      <Route path="/meals/:id" element={ <MealsDetails /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks/:id/in-progress" element={ <DrinksProgress /> } />
      <Route path="/drinks/:id" element={ <DrinksDetails /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}
