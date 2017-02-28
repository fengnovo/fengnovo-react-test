import React from 'react';
import { Link } from 'react-router';

const Header = (props) => {
  return (
    <header className="header">
      <nav>
        <div className="nav-item">
          <Link to="back"></Link>
        </div>
        <div className="nav-item">网易新闻</div>
        <div className="nav-item">
          <Link to="detail"></Link>
        </div>
      </nav>
    </header>
  )
};

export default Header;