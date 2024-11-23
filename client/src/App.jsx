
import './App.css';
import { useSelector } from "react-redux";

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import { Navigate } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/layout/UserProfile';
import AdminProfile from './components/layout/AdminProfile';
import ArtistProfile from './components/layout/ArtistProfile';



const App = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* You can place the container outside the Routes to avoid nesting issues */}
        <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          {!isAuth && <Route path="/login" element={<Login />} />}
          {isAuth && user.role === 'user' && (
            <Route path="/profile" element={<UserProfile />} />
          )}
          {isAuth && user.role === 'admin' && (
              <Route path="/profile" element={<AdminProfile />} />
            )}
            {isAuth && user.role === 'artist' && (
              <Route path="/profile" element={<ArtistProfile />} />
            )}
            {/* Fallback for unmatched paths */}
            <Route path="*" element={<Navigate to="/" />} />

          
          {/* Fallback for unmatched paths
          <Route path="*" element={<Navigate to={isAuth ? "/UserProfile" : "/login"} />} /> */}
        </Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
