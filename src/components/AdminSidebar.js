import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminSidebar extends Component {
  render() {
    const { location } = this.props;
    
    return (
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <SidebarLink to="/admin/dashboard" icon="📊" label="Overview" location={location} />
            <SidebarLink to="/admin/users" icon="👥" label="Users" location={location} />
            <SidebarLink to="/admin/categories" icon="📂" label="Categories" location={location} />
            <SidebarLink to="/admin/brands" icon="🏢" label="Brands" location={location} />
            <SidebarLink to="/admin/deals" icon="💰" label="Deals" location={location} />
            <SidebarLink to="/admin/blogs" icon="📝" label="Blogs" location={location} />
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Hop4Deals Admin
            </p>
          </div>
        </div>
      </div>
    );
  }
}

// Sidebar Link Component
class SidebarLink extends Component {
  render() {
    const { to, icon, label, location } = this.props;
    const isActive = location && location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="mr-3 text-lg">{icon}</span>
        {label}
      </Link>
    );
  }
}

export default AdminSidebar;
