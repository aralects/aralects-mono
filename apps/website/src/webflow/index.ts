import React from 'react';
import ReactDOM from 'react-dom/client';
import ExperienceAralects from '../components/sections/Home/ExperienceAralects';
import Footer from '../components/layout/Footer';
import './styles.css';

const roots: ReactDOM.Root[] = [];

const cleanup = () => {
  roots.forEach(root => root.unmount());
  roots.length = 0;
};

window.addEventListener('load', () => {
  cleanup();

  const newsletterContainer = document.getElementById('newsletter');
  if (newsletterContainer) {
    const root = ReactDOM.createRoot(newsletterContainer);
    roots.push(root);
    root.render(React.createElement(ExperienceAralects));
  }

  const footerContainer = document.getElementById('aralects-footer');
  if (footerContainer) {
    const root = ReactDOM.createRoot(footerContainer);
    roots.push(root);
    root.render(React.createElement(Footer));
  }
});

window.addEventListener('unload', cleanup); 