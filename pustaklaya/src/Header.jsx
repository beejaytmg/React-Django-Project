// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const handleLogout = () => {
    // Call the handleLogout function from props
    props.onLogout();
  };

  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Pustaklaya</h1>
        </div>
        <nav className="mt-4 lg:mt-0 space-y-4 lg:space-y-0 lg:space-x-4 flex items-center">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/about" className="text-white hover:underline">About Us</Link>
          <Link to="/upload" className="text-white hover:underline">Upload</Link>
          <p className="text-white mr-4 hover:underline">{props.name}</p>
          <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Logout</button>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
