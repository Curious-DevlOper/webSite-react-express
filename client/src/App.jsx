
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

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* You can place the container outside the Routes to avoid nesting issues */}
        <div>
        <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/register" element={<Register />} />
  {isAuth && <Route path="/UserProfile" element={<UserProfile />} />}
  {!isAuth && <Route path="/login" element={<Login />} />}
  {/* Fallback for unmatched paths */}
  <Route path="*" element={<Navigate to={isAuth ? "/UserProfile" : "/login"} />} />
</Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
