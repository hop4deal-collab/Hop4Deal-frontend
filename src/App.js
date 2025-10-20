import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
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

// Components
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';
import UserSidebar from './components/UserSidebar';

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
