import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.css';
import './components/configuration-drawer';
import './components/qmath-panel';
import './components/how-to';
import './components/update-logs';

import { initializeApp } from 'firebase/app';
import firebaseConfig from './utils/firebase-confg';
import App from './views/app';

// eslint-disable-next-line no-unused-vars
const fbApp = initializeApp(firebaseConfig);
const app = new App({ content: document.querySelector('#main-content') });

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
