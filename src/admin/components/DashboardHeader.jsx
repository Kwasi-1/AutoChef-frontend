const Header = () => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white my-6 border border-[#E8E9ED] rounded-lg">
      <div>
        <h1 className="text-xl font-semibold">Admin Central</h1>
        <p className="text-gray-500 hidden md:block">
          Monitor, manage, and maximize your auto shop's potential
        </p>
      </div>

      <div className="lg:flex items-center space-x-4 hidden">
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">David Anderson</p>
            <p className="text-xs text-gray-500">markatta@codealpha.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
