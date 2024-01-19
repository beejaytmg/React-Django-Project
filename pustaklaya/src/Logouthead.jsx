import React from 'react'
import { Link } from 'react-router-dom';
const Logouthead = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Pustaklaya</h1>
        </div>
        <nav className="space-x-4">
          <Link to={"/login"} className="text-white hover:underline" >Login</Link>
          <Link to={"/signup"} className="text-white hover:underline" >Signup</Link>
        </nav>
      </div>
    </header>
  )
}
export default Logouthead;