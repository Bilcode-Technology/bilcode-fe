import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// Import mock data for demonstration purposes
import { COURSES as courses } from '../../academy/api/mockData.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // --- REFACTORED: Simulate a full login payload ---
    // This is the correct data structure expected by AuthContext
    const loginData = {
      user: {
        id: 'user-123-xyz',
        name: 'Rizky',
        email: 'rizky@example.com',
        avatar: 'https://i.pravatar.cc/150?u=rizky',
        earnedBadges: ['FIRST_STEP'], // Example of existing badges
      },
      // Simulate user having enrolled in the first two courses
      enrolledCourses: courses.slice(0, 2).map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 60) + 10, // Give some random progress
        completedTopics: [],
      }))
    };

    login(loginData);
    navigate('/dashboard');
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Masuk ke Akun Anda</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Atau <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">daftar akun baru</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Alamat Email</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Alamat Email" defaultValue="rizky@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Kata Sandi</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Kata Sandi" defaultValue="password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Ingat saya</label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Lupa kata sandi?</a>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
