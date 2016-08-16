import React from 'react';
import { Link } from 'react-router';

const Header = (props) => {
  return (
    <header className="clearfix">
      <nav className="clearfix">
        <div className="nav-item">
          <Link to="newsList">NewsList</Link>
        </div>
        <div className="nav-item">
          <Link to="newsDetail">NewsDetail</Link>
        </div>
      </nav>
    </header>
  )
};

export default Header;