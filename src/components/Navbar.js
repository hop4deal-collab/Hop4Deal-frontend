import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

class Navbar extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  handleLogout = () => {
    this.context.logout();
  };

  render() {
    const { isAuthenticated,user } = this.context;
    const { isMenuOpen } = this.state;

    return (
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* LEFT SIDE — Logo + Links */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                Hop4Deals
              </Link>

              {/* Desktop Menu Links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-primary-600 text-sm font-medium">Home</Link>
                <Link to="/categories" className="text-gray-700 hover:text-primary-600 text-sm font-medium">Categories</Link>
                <Link to="/brands" className="text-gray-700 hover:text-primary-600 text-sm font-medium">Brands</Link>
                <Link to="/deals" className="text-gray-700 hover:text-primary-600 text-sm font-medium">Deals</Link>
                <Link to="/blogs" className="text-gray-700 hover:text-primary-600 text-sm font-medium">Blogs</Link>
                {isAuthenticated &&
                  <>
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" > Admin Dashboard </Link>)}
                    {user.role === 'dataEntry' && (<Link to="/user/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" > Dashboard </Link>)}
                  </>
                }
              </div>
            </div>

            {/* RIGHT SIDE — Logout Button */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={this.handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden flex items-center">
              <button
                onClick={this.toggleMenu}
                className="text-gray-700 hover:text-primary-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/" onClick={this.toggleMenu} className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                <Link to="/categories" onClick={this.toggleMenu} className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">Categories</Link>
                <Link to="/brands" onClick={this.toggleMenu} className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">Brands</Link>
                <Link to="/deals" onClick={this.toggleMenu} className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">Deals</Link>
                <Link to="/blogs" onClick={this.toggleMenu} className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">Blogs</Link>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      this.handleLogout();
                      this.toggleMenu();
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
