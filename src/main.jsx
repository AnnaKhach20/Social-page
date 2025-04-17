import React from 'react';
import './index.css';
import App from './App';
import { store } from './store/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  < Provider store={store}>
    <App />
  </ Provider>
  </BrowserRouter>
)
