import React, { Component } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { categoriesAPI, brandsAPI, dealsAPI, blogsAPI } from '../../services/api';

class UserOverview extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      stats: {
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
      const { user } = this.context;
      const promises = [];
      
      if (user.privileges.categories) {
        promises.push(categoriesAPI.getAll());
      }
      if (user.privileges.brands) {
        promises.push(brandsAPI.getAll());
      }
      if (user.privileges.deals) {
        promises.push(dealsAPI.getAll());
      }
      if (user.privileges.blogs) {
        promises.push(blogsAPI.getAll());
      }

      const responses = await Promise.all(promises);
      
      let index = 0;
      const stats = { categories: 0, brands: 0, deals: 0, blogs: 0 };
      
      if (user.privileges.categories) {
        stats.categories = responses[index].data.length;
        index++;
      }
      if (user.privileges.brands) {
        stats.brands = responses[index].data.length;
        index++;
      }
      if (user.privileges.deals) {
        stats.deals = responses[index].data.length;
        index++;
      }
      if (user.privileges.blogs) {
        stats.blogs = responses[index].data.length;
      }

      this.setState({
        stats,
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
    const { user } = this.context;
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

    const availableModules = [];
    if (user.privileges.categories) availableModules.push({ name: 'Categories', count: stats.categories, icon: '📂', color: 'bg-green-500' });
    if (user.privileges.brands) availableModules.push({ name: 'Brands', count: stats.brands, icon: '🏢', color: 'bg-purple-500' });
    if (user.privileges.deals) availableModules.push({ name: 'Deals', count: stats.deals, icon: '💰', color: 'bg-yellow-500' });
    if (user.privileges.blogs) availableModules.push({ name: 'Blogs', count: stats.blogs, icon: '📝', color: 'bg-pink-500' });

    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.email}</h1>
          <p className="text-gray-600 mt-2">Manage your assigned modules and content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableModules.map((module, index) => (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`${module.color} text-white p-3 rounded-lg mr-4`}>
                  <span className="text-2xl">{module.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{module.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{module.count}</p>
                  <p className="text-xs text-gray-500">Total Items</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Modules</h3>
            <div className="space-y-3">
              {availableModules.map((module, index) => (
                <a
                  key={index}
                  href={`/user/${module.name.toLowerCase()}`}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg mr-3">{module.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{module.name}</p>
                    <p className="text-sm text-gray-600">{module.count} items</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <span className="text-lg mr-3">💡</span>
                <div>
                  <p className="font-medium text-gray-900">Getting Started</p>
                  <p className="text-sm text-gray-600">Use the sidebar to navigate between your assigned modules</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-green-50 rounded-lg">
                <span className="text-lg mr-3">✅</span>
                <div>
                  <p className="font-medium text-gray-900">Best Practices</p>
                  <p className="text-sm text-gray-600">Always provide accurate and detailed information</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                <span className="text-lg mr-3">📊</span>
                <div>
                  <p className="font-medium text-gray-900">Track Progress</p>
                  <p className="text-sm text-gray-600">Monitor your content creation and management</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Access Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Access Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(user.privileges).map(([privilege, hasAccess]) => (
              <div key={privilege} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${hasAccess ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-600 capitalize">{privilege}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserOverview;

