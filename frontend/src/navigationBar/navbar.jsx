import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({changeColor}) => {
  const [navbarBackground, setNavbarBackground] = useState(false);
  useEffect(()=>{
    if (changeColor === false) {
      const navBarDiv = document.getElementById('navbar');
      navBarDiv.style.backgroundColor="rgba(22, 37, 57)";
    }
  });
  useEffect(() => {
    const handleScroll = () => {
      if (changeColor === true) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollY / (totalHeight - windowHeight)) * 100;
        const hasBackground = scrollPercentage > 40;

        if (hasBackground) {
          const navBarDiv = document.getElementById('navbar');
          navBarDiv.style.backgroundColor="rgba(22, 37, 57)";
        }
        else {
          const navBarDiv = document.getElementById('navbar');
          navBarDiv.style.backgroundColor="rgba(0,0,0,0.2)";
        }
        setNavbarBackground(hasBackground);
      }
      else {
        const navBarDiv = document.getElementById('navbar');
        navBarDiv.style.backgroundColor="rgba(22, 37, 57)";
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [changeColor]);

  const navbarClass = navbarBackground ? 'navbar-scrolled' : '';

  return (
    <div id = "navbar" className={`navbar fixed-top navbar-expand-lg ${navbarClass} navbar-dark p-md-3`}>
      <div className="container">
        <a href="#" className="navbar-brand">EMOTDAR</a>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-target="#navbarNav"
          data-bs-toggle="collapse"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle Navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto"></div>
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/" className="nav-link text-white">HOME</Link></li>
            <li className="nav-item"><Link to="/recorder" className="nav-link text-white">RECORDER</Link></li>
            <li className="nav-item"><Link to="/detector" className="nav-link text-white">DETECTOR</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link text-white">ABOUT US</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
