import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import DealsPage from './pages/DealsPage';
import CategoriesPage from './pages/CategoriesPage';
import BlogsPage from './pages/BlogsPage';
import BrandsPage from './pages/BrandsPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';

class App extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/*" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

// Component to handle login route logic
class LoginRoute extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated, user } = this.context;

    if (isAuthenticated) {
      // Redirect based on user role
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
