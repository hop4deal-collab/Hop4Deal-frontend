import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSidebar extends Component {
  render() {
    const { user, location } = this.props;

    const menuItems = [
      { to: '/user/dashboard', icon: '📊', label: 'Overview' },
      ...(user.privileges.categories ? [{ to: '/user/categories', icon: '📂', label: 'Categories' }] : []),
      ...(user.privileges.brands ? [{ to: '/user/brands', icon: '🏢', label: 'Brands' }] : []),
      ...(user.privileges.deals ? [{ to: '/user/deals', icon: '💰', label: 'Deals' }] : []),
      ...(user.privileges.blogs ? [{ to: '/user/blogs', icon: '📝', label: 'Blogs' }] : []),
    ];

    return (
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <h1 className="text-xl font-bold text-white">User Panel</h1>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-500">Data Entry User</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                location={location}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Hop4Deals User
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

export default UserSidebar;
