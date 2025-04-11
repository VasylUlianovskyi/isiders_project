import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import CalendarView from './components/Events/CalendarView/CalendarView';

import EventsList from './components/Events/EventsList/EventsList';
import EventsForm from './components/Events/EventsForm/EventsForm';
import Header from './components/Header/Header';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrarionForm/RegistrationForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './app.css';

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate('/login');
  };

  if (isLoading) return null;

  return (
    <div className='app-layout'>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      {isLoggedIn && <Navbar />}

      <main className='app-content'>
        <Routes>
          <Route
            path='/login'
            element={
              <ProtectedRoute isLoggedIn={!isLoggedIn}>
                <LoginForm
                  onLoginSuccess={(email: string) => {
                    setIsLoggedIn(true);
                    setUserEmail(email);
                    navigate('/');
                  }}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/registration'
            element={
              <ProtectedRoute isLoggedIn={!isLoggedIn}>
                <RegistrationForm />
              </ProtectedRoute>
            }
          />

          <Route
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/calendar'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CalendarView />
              </ProtectedRoute>
            }
          />
          <Route
            path='/events'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EventsList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/form'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EventsForm />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
