import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalProvider from './context/GlobalProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>,
  );
