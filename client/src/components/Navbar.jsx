import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom'



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  const handleSearch = (e)=>{
    e.preventDefault()
    console.log(searchTerm)
    navigate(`/search?q=${searchTerm}`)
  }



  return (
    <nav
      className={`fixed top-0 left-0 w-full z-10 transition duration-500 ease-in-out ${
        isScrolled ? 'bg-opacity-70 backdrop-filter backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={`/`} className="text-white text-lg font-bold">Sociomate</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
          <form onSubmit={handleSearch}>
            <div className="group">
                <svg className="icon mt-3" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input
                    value={searchTerm}
                    onKeyDown={(e)=>{
                            e.key==='Enter' && handleSearch(e);
                    }}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    placeholder="Search"
                    type="search"
                    className="input_search mt-3"
                />
            </div>
            </form>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center space-x-4">
          <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium"
            >
                Home
            </Link>
            <Link
                to="/connection"
                className="text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium"
            >
                Connections
            </Link>
            <Link
                to="/profile"
                className="text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium"
            >
                Profile
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div className="mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="xl:hidden">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to={`/`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:bg-opacity-50"
              >
                Home
              </Link>
              <Link
                to={`/connection`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:bg-opacity-50"
              >
                Connections
              </Link>
              <Link
                to={`/profile`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:bg-opacity-50"
              >
                Profile
              </Link>

              <form onSubmit={handleSearch} className='mt-3 mr-3'>
                <input
                type="text"
                value={searchTerm}
                onKeyDown={(e)=>{
                          e.key==='Enter' && handleSearch(e);
                }}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="Search"
                className="px-3 py-3 mt-5 w-full  rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
