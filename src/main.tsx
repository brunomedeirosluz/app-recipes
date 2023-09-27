import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RouteProvider from './context/RouteProvider';
import GlobalProvider from './context/GlobalProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <GlobalProvider>
      <BrowserRouter>
        <RouteProvider>
          <App />
        </RouteProvider>
      </BrowserRouter>
    </GlobalProvider>,

  );
