import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import FavoriteQuotePage from './pages/FavoriteQuotePage'
import './App.css'

function App() {

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path='/' element= { <HomePage /> } />
            <Route path='/favorite' element= { <FavoriteQuotePage /> } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
