import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = ({onSignup}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        email,
        username,
        password
      });

      console.log('Signup successful', response.data);

      // Call the onSignup callback with the user data
      onSignup(response.data);
      navigate("/");
    } catch (error) {
      console.error('Signup failed', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form id="signupForm" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Signup
        </button>
      </form>
    </div>
  )
}
export default Signup;