import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Scene } from './Scene';
import { experiences } from "./types/Types"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Scene experiences={experiences}/>
    <App />
  </React.StrictMode>
);