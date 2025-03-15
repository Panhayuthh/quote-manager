import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import FavoriteQuotePage from './pages/FavoriteQuotePage'
import './App.css'
import GuestLayout from './layouts/GuestLayout';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route element={ <AuthLayout /> }>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/favorite" element={ <FavoriteQuotePage /> } />
          </Route>

          <Route element={ <GuestLayout /> }>
              <Route path="/login" element={ <LoginPage /> } />
              <Route path='/register' element={ <RegisterPage /> } />
          </Route>

          {/* route to notfound page */}
          <Route path="*" element={ <NotFound /> } />
        </Routes>
          <ToastContainer position='bottom-right' />
      </div>
    </Router>
  )
}

export default App
