import React from 'react';

const Subscription = ({ title, description }) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="max-w-md mx-auto">
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-r-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscription;