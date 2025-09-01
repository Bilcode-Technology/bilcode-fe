import React from 'react';

const Subscription = () => {
  return (
    <div className="max-w-md mx-auto">
      <form className="flex items-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscription;
