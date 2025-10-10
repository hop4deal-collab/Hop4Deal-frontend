import React, { Component } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
    const { isAuthenticated, user } = this.context;
    const { isMenuOpen } = this.state;

    return (
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-primary-600">
                    Hop4Deals
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {user.role === 'dataEntry' && (
                    <Link
                      to="/user/dashboard"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Welcome, {user.email}
                    </span>
                    <button
                      onClick={this.handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={this.toggleMenu}
                className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={this.toggleMenu}
                >
                  Home
                </Link>
                
                {isAuthenticated ? (
                  <>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={this.toggleMenu}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {user.role === 'dataEntry' && (
                      <Link
                        to="/user/dashboard"
                        className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={this.toggleMenu}
                      >
                        Dashboard
                      </Link>
                    )}
                    <div className="px-3 py-2">
                      <span className="text-sm text-gray-600">
                        Welcome, {user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        this.handleLogout();
                        this.toggleMenu();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="bg-primary-600 hover:bg-primary-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={this.toggleMenu}
                  >
                    Login
                  </Link>
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

