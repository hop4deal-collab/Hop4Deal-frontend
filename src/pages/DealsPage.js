// src/pages/DealsPage.js
import React, { Component } from 'react';
import { dealsAPI, brandsAPI, categoriesAPI } from '../services/api';
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
        type: '', // NEW: Deal or Offer
      },
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadData();
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
      const matchType =
        !filters.type ||
        (filters.type === 'deal' && (!d.type || d.type === 'deal')) ||
        (filters.type === 'offer' && d.type === 'offer');
      return matchBrand && matchCategory && matchHot && matchType;
    });
  };

  render() {
    const { loading, error, brands, categories, filters } = this.state;
    const deals = this.getFilteredDeals();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-purple-700">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-white"></div>
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
      <div className="min-h-screen bg-gray-50">
        {/* 🌈 Hero Banner */}
        <div className="relative bg-gradient-to-r from-primary-500 to-purple-600 text-white py-20 overflow-hidden">
         
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Discover Amazing Deals & Offers ✨
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg opacity-90 max-w-2xl mx-auto"
            >
              Save more with the best discounts, exclusive brand offers, and limited-time deals.
            </motion.p>
          </div>
        </div>

        {/* 🧩 Filters Section */}
        <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
          <div className="backdrop-blur-lg bg-white/80 border border-white/30 shadow-lg rounded-xl p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={this.handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={this.handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hot</label>
                <select
                  name="isHot"
                  value={filters.isHot}
                  onChange={this.handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All</option>
                  <option value="true">Hot Only</option>
                  <option value="false">Not Hot</option>
                </select>
              </div>

              {/* 🆕 Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={this.handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All</option>
                  <option value="deal">Deal</option>
                  <option value="offer">Offer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 💎 Deals Grid */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {deals.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg">No deals found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal, idx) => (
                <motion.div
                  key={deal._id}
                  onClick={() => window.open(deal.link, '_blank')}
                  className="cursor-pointer bg-white/90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl border border-transparent hover:border-primary-400 transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      { deal.type !== 'offer' &&<span className="px-3 py-1 bg-gradient-to-r from-primary-400 to-purple-500 text-white text-sm font-semibold rounded-full">
                        {deal.percentOff}% OFF
                      </span>}
                       { deal.type == 'offer' &&<span className="px-3 py-1 bg-gradient-to-r from-primary-400 to-purple-500 text-white text-sm font-semibold rounded-full">
                        OFFER
                      </span>}
                      { deal.type !== 'offer' &&<span className="text-sm text-gray-500">
                        {new Date(deal.endDate).toLocaleDateString()}
                      </span>}
                    </div>
                    <h3 className="text-lg font-semibold text-primary-700 mb-2">{deal.brand?.name}</h3>
                    <p className="text-gray-700 mb-4">{deal.description}</p>
                    { deal.type !== 'offer' && <div className="bg-gradient-to-r from-primary-50 to-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Use Code:</p>
                      <p className="font-mono text-lg font-bold text-primary-700">{deal.code}</p>
                    </div>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DealsPage;
