import React, { Component } from 'react';
import { usersAPI, categoriesAPI, brandsAPI, dealsAPI, blogsAPI } from '../../services/api';

class AdminOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        users: 0,
        categories: 0,
        brands: 0,
        deals: 0,
        blogs: 0,
      },
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadStats();
  }

  loadStats = async () => {
    try {
      const [usersRes, categoriesRes, brandsRes, dealsRes, blogsRes] = await Promise.all([
        usersAPI.getAll(),
        categoriesAPI.getAll(),
        brandsAPI.getAll(),
        dealsAPI.getAll(),
        blogsAPI.getAll(),
      ]);

      this.setState({
        stats: {
          users: usersRes.data.length,
          categories: categoriesRes.data.length,
          brands: brandsRes.data.length,
          deals: dealsRes.data.length,
          blogs: blogsRes.data.length,
        },
        loading: false,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      this.setState({
        error: 'Failed to load statistics',
        loading: false,
      });
    }
  };

  render() {
    const { stats, loading, error } = this.state;

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      );
    }

    const statCards = [
      {
        title: 'Total Users',
        value: stats.users,
        icon: '👥',
        color: 'bg-blue-500',
        description: 'Data Entry Users',
      },
      {
        title: 'Categories',
        value: stats.categories,
        icon: '📂',
        color: 'bg-green-500',
        description: 'Active Categories',
      },
      {
        title: 'Brands',
        value: stats.brands,
        icon: '🏢',
        color: 'bg-purple-500',
        description: 'Registered Brands',
      },
      {
        title: 'Deals',
        value: stats.deals,
        icon: '💰',
        color: 'bg-yellow-500',
        description: 'Active Deals',
      },
      {
        title: 'Blogs',
        value: stats.blogs,
        icon: '📝',
        color: 'bg-pink-500',
        description: 'Published Blogs',
      },
    ];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome to the Hop4Deals admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`${stat.color} text-white p-3 rounded-lg mr-4`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/admin/users"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg mr-3">👥</span>
                <div>
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-600">Create and manage data entry users</p>
                </div>
              </a>
              <a
                href="/admin/categories"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg mr-3">📂</span>
                <div>
                  <p className="font-medium text-gray-900">Manage Categories</p>
                  <p className="text-sm text-gray-600">Add and edit product categories</p>
                </div>
              </a>
              <a
                href="/admin/brands"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg mr-3">🏢</span>
                <div>
                  <p className="font-medium text-gray-900">Manage Brands</p>
                  <p className="text-sm text-gray-600">Add and edit brand information</p>
                </div>
              </a>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-lg mr-3">💰</span>
                <div>
                  <p className="font-medium text-gray-900">New Deals</p>
                  <p className="text-sm text-gray-600">Manage and create new deals</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="text-lg mr-3">📝</span>
                <div>
                  <p className="font-medium text-gray-900">Blog Posts</p>
                  <p className="text-sm text-gray-600">Create and manage blog content</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-lg mr-3">📊</span>
                <div>
                  <p className="font-medium text-gray-900">Analytics</p>
                  <p className="text-sm text-gray-600">View platform statistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">Database: Connected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">API: Running</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">Frontend: Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminOverview;

