const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Logo</div>
      <nav className="hidden md:flex space-x-4">
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Services</a>
        <a href="#" className="hover:text-gray-300">Portfolio</a>
        <a href="#" className="hover:text-gray-300">About Us</a>
        <a href="#" className="hover:text-gray-300">Contact</a>
      </nav>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Get a Quote
      </button>
    </header>
  );
};

export default Header;