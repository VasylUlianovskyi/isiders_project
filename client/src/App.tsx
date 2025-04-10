import './app.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CalendarView from './components/Events/CalendarView/CalendarView';

import EventsList from './components/Events/EventsList/EventsList';
import EventsForm from './components/Events/EventsForm/EventsForm';
import Header from './components/Header/Header';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';

export default function App () {
  return (
    <div className='app-layout'>
      <Header />
      <Navbar />
      <main className='app-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/calendar' element={<CalendarView />} />
          <Route path='/events' element={<EventsList />} />
          <Route path='/form' element={<EventsForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
