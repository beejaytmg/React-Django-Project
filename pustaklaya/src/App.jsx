import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import './App.css'
import Signup from './Signup';
import { redirect } from "react-router-dom";
import Header from './Header';
import Logouthead from './Logouthead';
import Books from './Books';
import BookDetail from './Bookdetail';
import UploadBook from './UploadBook';
import About from './About';
function App() {
  
  const [user, setUser] = useState('');
 
  useEffect(() => {
    // Check local storage for user data on component mount
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const handleLoginSignupSuccess = (user) => {
    
    setUser(user); // Update local state for username
    localStorage.setItem('user', JSON.stringify(user));
  };
  const handleLogout = () => {
    // Clear user data from state and local storage
    setUser(null);
    localStorage.removeItem('user');
    redirect("/login");
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element:<div>{user ? (
        <>
        <Header name={user.username} onLogout={handleLogout} />
        <Books />
        </> 
    ) : (
      <Logouthead />
    )}</div>,
    },
    {
      path: "/book/:id",
      element:<>
      {user ? (
        <>
        <Header name={user.username} onLogout={handleLogout} />
        <BookDetail />
        </> 
    ) : (
      <Logouthead />
    )}
      </>,
    },
    {
      path: "/about",
      element:<>
      {user ? (
        <>
        <Header name={user.username} onLogout={handleLogout} />
        <About />
        </> 
    ) : (
      <Logouthead />
    )}
      </>,
    },
    {
      path: "/upload",
      element:<>
      {user ? (
        <>
        <Header name={user.username} onLogout={handleLogout} />
        <UploadBook />
        </> 
    ) : (
      <Logouthead />
    )}
      </>,
    },
    {
      path: "login/",
      element: <div><Logouthead /><Login onLogin={handleLoginSignupSuccess} /></div> ,
    },
    {
      path: "signup/",
      element: <div><Logouthead /><Signup onSignup={handleLoginSignupSuccess} /></div>,
    },
  ]);

  return (
    <>
 
      <RouterProvider router={router} />
    </>
  )
}

export default App
