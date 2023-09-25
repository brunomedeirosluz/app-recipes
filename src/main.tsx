import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MealsProvider from './context/MealsProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <MealsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MealsProvider>,
  );
