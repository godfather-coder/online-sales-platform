import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { DataContext } from '../../context/DataContext';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useContext(DataContext)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav key='123' className="navbar">
      <div className="navbar-brand">
        <Link to="/">Service Sales Platform</Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li className="navbar-item">
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/pools" onClick={toggleMenu}>Pools</Link>
        </li>
        <li className="navbar-item">
          <Link to="/sports" onClick={toggleMenu}>Sports</Link>
        </li>
        <li className="navbar-item">
          <Link to="/fitness" onClick={toggleMenu}>Fitness</Link>
        </li>
        {data ? (
          <>
            <li className="navbar-item">
              <Link to="/me" onClick={toggleMenu}>Profile</Link>
            </li>
            <li className="navbar-item">
              <Link to="/cart" onClick={toggleMenu}>Cart</Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login" onClick={toggleMenu}>Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
            </li>
          </>
        )}
       
      </ul>
    </nav>
  );
}

export default Navbar;
