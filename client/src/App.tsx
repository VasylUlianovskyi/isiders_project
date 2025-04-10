import './app.css';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

export default function App () {
  return (
    <div className='app-layout'>
      <Header />
      <main className='app-content'>
        <Home />
      </main>
      <Footer />
    </div>
  );
}
