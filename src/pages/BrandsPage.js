import React, { Component } from 'react';
import { brandsAPI } from '../services/api';
import { Link } from 'react-router-dom';

class BrandsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const res = await brandsAPI.getAll();
      this.setState({ brands: res.data, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to load brands', loading: false });
    }
  };

  render() {
    const { brands, loading, error } = this.state;

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
              <h1 className="text-3xl font-bold text-gray-900">All Brands</h1>
              <p className="text-gray-600">Browse all brands</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand) => (
              <Link key={brand._id} to={`/deals?brand=${brand._id}`} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    {brand.logo ? (
                      <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-full" />
                    ) : (
                      <span className="text-2xl font-bold text-primary-600">{brand.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{brand.name}</h3>
                  <p className="text-sm text-gray-600">{brand.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BrandsPage;



