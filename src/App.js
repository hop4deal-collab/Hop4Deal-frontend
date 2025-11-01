import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import DealsPage from './pages/DealsPage';
import CategoriesPage from './pages/CategoriesPage';
import BlogsPage from './pages/BlogsPage';
import BrandsPage from './pages/BrandsPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import BrandDetailsPage from './pages/BrandDetailPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivatePolicy';
import CookiePolicy from './pages/CookiePolicy';
import Imprint from './pages/legalDisclosure';
import ScrollToTop from './ScrollToTop';

// Components
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';
import UserSidebar from './components/UserSidebar';
import SeasonsPage from './pages/Seasons';

class App extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <AuthProvider>
        <Router>
          <MainApp />
        </Router>
      </AuthProvider>
    );
  }
}

// 👇 Functional component to use hooks like useLocation
const MainApp = () => {
  const location = useLocation();
  const { isAuthenticated, user } = React.useContext(AuthContext);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserRoute = location.pathname.startsWith('/user');
  const showSidebar = (isAdminRoute || isUserRoute) && isAuthenticated;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ✅ Sidebar */}
      {showSidebar && (
        <>
          {isAdminRoute && <AdminSidebar location={location} />}
          {isUserRoute && user && <UserSidebar user={user} location={location} />}
        </>
      )}
      <ScrollToTop />
      {/* ✅ Main content */}
      <div className={`flex-1 ${showSidebar ? 'ml-64' : ''}`}>
        <Navbar />

        {/* ✅ Toast container (GLOBAL) */}
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <div>
          <Routes>
            {/* 🌍 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/896552147/login" element={<LoginRoute />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/seasons" element={<SeasonsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brandDetail/:id" element={<BrandDetailsPage />} />

            {/* 🔒 Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 👤 User Routes */}
            <Route
              path="/user/*"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🔁 Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Footer */}
         <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white mt-12 relative overflow-hidden">
  {/* subtle glow background */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-1/3 w-64 h-64 bg-purple-400 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start text-center sm:text-left">
      
      {/* Brand + description */}
      <div>
        <div className="text-2xl font-extrabold tracking-tight">Hop4Deals</div>
        <p className="text-sm text-purple-200 mt-3 leading-relaxed max-w-sm mx-auto sm:mx-0">
          Discover verified discounts, exclusive brand coupons, and flash deals — all curated daily so you can save more, faster.
        </p>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-purple-100">Quick Links</h4>
        <ul className="space-y-2 text-sm text-purple-200">
          <li><Link to="/aboutus" className="hover:text-white inline-block transition-transform hover:translate-x-1">About</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-white inline-block transition-transform hover:translate-x-1">Privacy Policy</Link></li>
          <li><Link to="/cookie-policy" className="hover:text-white inline-block transition-transform hover:translate-x-1">Cookie Policy</Link></li>
          <li><Link to="/imprint" className="hover:text-white inline-block transition-transform hover:translate-x-1">Imprint</Link></li>
        </ul>
      </div>

      {/* Explore */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-purple-100">Explore</h4>
        <ul className="space-y-2 text-sm text-purple-200">
          <li><Link to="/home" className="hover:text-white inline-block transition-transform hover:translate-x-1">Home</Link></li>
          <li><Link to="/brands" className="hover:text-white inline-block transition-transform hover:translate-x-1">Brands</Link></li>
          <li><Link to="/categories" className="hover:text-white inline-block transition-transform hover:translate-x-1">Categories</Link></li>
          <li><Link to="/deals" className="hover:text-white inline-block transition-transform hover:translate-x-1">Deals</Link></li>
          <li><Link to="/blogs" className="hover:text-white inline-block transition-transform hover:translate-x-1">Blogs</Link></li>
        </ul>
      </div>

      {/* Social media */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-purple-100">Connect with Us</h4>
        <div className="flex justify-center sm:justify-start items-center gap-4">
          <a
            href="https://www.facebook.com/share/1CU9j3vaXw/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition flex items-center justify-center"
          >
            <i className="fab fa-facebook-f text-2xl text-blue-400 drop-shadow"></i>
          </a>
          <a
            href="https://www.instagram.com/hop4deal?utm_source=qr&igsh=MXZvMjhrdW10ajFwdQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition flex items-center justify-center"
          >
            <i className="fab fa-instagram text-2xl text-pink-400 drop-shadow"></i>
          </a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="mt-10 border-t border-purple-700/50"></div>

    {/* Bottom row */}
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-purple-300 text-center md:text-left">
      <p>Disclosure: We may earn a commission when you make a purchase through links or coupons on our website. This helps us keep our service free for you.</p>
    </div>

    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-purple-300 text-center md:text-left">
      <p>© {new Date().getFullYear()} <span className="font-semibold text-purple-100">Hop4Deals</span>. All rights reserved.</p>
    </div>
  </div>
</footer>

        </div>
      </div>
    </div>
  );
};


// 🔐 Login route redirect logic
class LoginRoute extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated, user } = this.context;

    if (isAuthenticated) {
      if (user.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/user/dashboard" replace />;
      }
    }

    return <Login />;
  }
}

export default App;
