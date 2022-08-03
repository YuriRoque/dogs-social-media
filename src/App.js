import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/Helper/ProtectedRoute';
import Photo from './components/Photo';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import NotFound from './pages/User/NotFound';
import UserProfile from './pages/User/UserProfile';
import { UserStorage } from './UserContext';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className='AppBody'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='login/*' element={<Login />} />
              <Route
                path='conta/*'
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route path='foto/:id' element={<Photo />} />
              <Route path='perfil/:user' element={<UserProfile />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
