import React, { Component } from 'react';
import { dealsAPI, brandsAPI, categoriesAPI } from '../services/api';
import { createSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
class DealsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [],
      brands: [],
      categories: [],
      filters: {
        brand: '',
        category: '',
        isHot: '',
      },
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
    // Initialize filters from URL query
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand') || '';
    if (brand) {
      this.setState((prev) => ({ filters: { ...prev.filters, brand } }));
    }
  }

  loadData = async () => {
    try {
      const [dealsRes, brandsRes, categoriesRes] = await Promise.all([
        dealsAPI.getAll(),
        brandsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);

      this.setState({
        deals: dealsRes.data,
        brands: brandsRes.data,
        categories: categoriesRes.data,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: 'Failed to load deals', loading: false });
    }
  };

  handleFilterChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({ filters: { ...prev.filters, [name]: value } }));
  };

  getFilteredDeals = () => {
    const { deals, filters } = this.state;
    return deals.filter((d) => {
      const matchBrand = !filters.brand || d.brand?._id === filters.brand;
      const matchHot = filters.isHot === '' || String(d.isHot) === filters.isHot;
      const matchCategory = !filters.category || d.brand?.category?._id === filters.category;
      return matchBrand && matchCategory && matchHot;
    });
  };

  render() {
    const { loading, error, brands, categories, filters } = this.state;
    const deals = this.getFilteredDeals();

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
              <h1 className="text-3xl font-bold text-gray-900">All Deals</h1>
              <p className="text-gray-600">Browse all available deals and offers</p>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select name="brand" value={filters.brand} onChange={this.handleFilterChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" value={filters.category} onChange={this.handleFilterChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hot</label>
                <select name="isHot" value={filters.isHot} onChange={this.handleFilterChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">All</option>
                  <option value="true">Hot Only</option>
                  <option value="false">Not Hot</option>
                </select>
              </div>
            </div>
          </div>

          {/* Deals grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal, idx) => (
              <motion.div
                    key={deal._id}
                     onClick={() => window.open(deal.link, "_blank")}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl border border-transparent hover:border-primary-400 transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-primary-400 to-primary-600 text-white text-sm font-semibold rounded">
                        {deal.percentOff}% OFF
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(deal.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-2">
                      {deal.brand?.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{deal.description}</p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Use Code:</p>
                      <p className="font-mono text-lg font-bold text-primary-700">
                        {deal.code}
                      </p>
                    </div>
                  </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DealsPage;


