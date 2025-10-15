import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Scene } from './Scene';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Scene />
    <App />
  </React.StrictMode>
);