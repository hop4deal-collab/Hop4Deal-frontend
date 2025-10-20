import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

class ProtectedRoute extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated, loading, user } = this.context;
    const { children, requireAdmin = false, requirePrivilege = null } = this.props;

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/896552147/login" replace />;
    }

    if (requireAdmin && user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    if (requirePrivilege && !this.context.hasPrivilege(requirePrivilege)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ProtectedRoute;

