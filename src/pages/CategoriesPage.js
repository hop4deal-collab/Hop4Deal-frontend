import React, { Component } from 'react';
import { categoriesAPI } from '../services/api';

class CategoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const res = await categoriesAPI.getAll();
      this.setState({ categories: res.data, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to load categories', loading: false });
    }
  };

  render() {
    const { categories, loading, error } = this.state;

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Categories</h1>
              <p className="text-gray-600">Browse all categories</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <div key={cat._id} className="card card-hover text-center py-6">
                <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesPage;



