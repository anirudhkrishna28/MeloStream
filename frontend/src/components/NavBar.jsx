// Layout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Inner.css';

const NavBar = ({ children }) => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('userId');
    navigate('/auth');
  };

  return (
    <div className='nav'>
    <div className="navbar">
      <div className='logo'>
      <i class='fab fa-soundcloud'></i>
      <h1>Melostream</h1>
      </div>
      <div className='menu-bar'>
        <Link to="/home"><i class="fa-solid fa-house"></i></Link>
        <Link to="/search"><i class="fa-solid fa-magnifying-glass"></i></Link>
        <Link to="/playlists"><i class="fa-brands fa-playstation"></i></Link>
        </div>
        {/* Add other links relevant to your music web */}
        {!cookies.access_token ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <>
            {/* Add other links relevant to logged-in users */}
            <button onClick={logout}>Logout</button>
          </>
        )}
      <div className="content">{children}</div>
    </div>
    </div>
  );
};

export default NavBar;
