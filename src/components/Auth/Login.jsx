import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseconfig';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Projects'); // redirect after login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        {!user ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-3"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-green-600 font-semibold">You're already logged in as {user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mb-3"
            >
              Sign Out
            </button>
            <Link
              to="/Projects"
              className="block text-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
