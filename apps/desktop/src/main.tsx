import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import '@svitlo/playground/styles';

const element = document.getElementById('root');
if (!element) throw new Error('Missing Desktop application root');
createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
