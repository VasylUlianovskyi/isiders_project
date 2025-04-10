import { useState } from 'preact/hooks';

import './app.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

export function App () {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
