import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Meals from './pages/Meals';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
    </Routes>
  );
}
