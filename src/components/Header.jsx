const Header = () => {
  return (
    <header className="flex justify-center pt-10">
      <div className="flex items-center justify-between px-6 py-4 bg-white w-2/3">
        <div className="flex items-center gap-10">
          <div className="text-3xl font-semibold text-black">Bilcode</div>
          <nav className="hidden md:flex gap-10">
            <a href="#" className="text-gray-700 font-medium hover:text-black">
              Product
            </a>
            <a href="#" className="text-gray-700 font-medium hover:text-black">
              Customers
            </a>
            <a href="#" className="text-gray-700 font-medium hover:text-black">
              Templates
            </a>
            <a href="#" className="text-gray-700 font-medium hover:text-black">
              Pricing
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-7">
          <a href="#" className="text-gray-700 font-medium hover:text-black">
            Log in
          </a>
          <button className="bg-black text-lg font-medium text-white px-7 py-3 rounded-full hover:bg-gray-800">
            Try for free
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
