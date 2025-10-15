import React, { Component } from 'react';
import { brandsAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

class BrandsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      visibleBrands: [],
      searchQuery: '',
      loading: true,
      error: null,
      itemsPerPage: 30,
      currentPage: 1,
      isLoadingMore: false,
    };
  }

  componentDidMount() {
    this.loadData();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadData = async () => {
    try {
      const res = await brandsAPI.getAll();
      this.setState({
        brands: res.data,
        visibleBrands: res.data.slice(0, this.state.itemsPerPage),
        loading: false,
      });
    } catch (error) {
      this.setState({ error: 'Failed to load brands', loading: false });
    }
  };

  handleScroll = () => {
    const { isLoadingMore, loading } = this.state;
    if (loading || isLoadingMore) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
      this.loadMoreBrands();
    }
  };

  loadMoreBrands = () => {
    const { currentPage, itemsPerPage, brands, visibleBrands } = this.state;
    const nextPage = currentPage + 1;
    const nextBrands = brands.slice(0, nextPage * itemsPerPage);

    if (nextBrands.length === visibleBrands.length) return;

    this.setState({ isLoadingMore: true });

    setTimeout(() => {
      this.setState({
        visibleBrands: nextBrands,
        currentPage: nextPage,
        isLoadingMore: false,
      });
    }, 600);
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value, currentPage: 1 });
  };

  getFilteredBrands = () => {
    const { brands, searchQuery } = this.state;
    const filtered = brands.filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered;
  };

  render() {
    const { loading, error, searchQuery, isLoadingMore } = this.state;
    let visibleBrands = this.state.visibleBrands;

    const filteredBrands = this.getFilteredBrands();
    if (searchQuery) visibleBrands = filteredBrands;

    // 🌀 Loader while initial fetch
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-purple-700">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 border-4 border-white/40 rounded-full animate-ping"></div>
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
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
              Explore Your Favorite Brands 💫
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg opacity-90 max-w-2xl mx-auto"
            >
              Browse exclusive deals and offers from top brands worldwide.
            </motion.p>
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20 mb-10">
          <div className="backdrop-blur-lg bg-white/80 border border-white/30 shadow-lg rounded-xl p-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110 2.5a7.5 7.5 0 016.65 14.15z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search brands by name..."
              value={searchQuery}
              onChange={this.handleSearchChange}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>

        {/* 💎 Brands Grid */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {visibleBrands.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg">No brands found matching your search.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8"
            >
              {visibleBrands.map((brand) => (
                 <motion.div
                  key={brand._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Link to={`/brandDetail/${brand._id}`}>
                    <div className="group bg-white/80 backdrop-blur-lg rounded-xl shadow-md hover:shadow-2xl border border-transparent hover:border-primary-400 transition-all duration-300 text-center p-6">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                        {brand.logo ? (
                          <img
                            src={brand.logo ? (brand.logo?.startsWith('/upload') ? `${process.env.REACT_APP_API_URL.slice(0, -4)}${brand.logo}` : null) : null}
                            alt={brand.name}
                            className="w-16 h-16 object-contain rounded-full group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-primary-600">
                            {brand.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-primary-700 mb-1">{brand.name}</h3>
                      <p className="text-sm text-gray-600">
                        {brand.tagline || 'Exclusive Deals'}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 🔄 Lazy Loading Loader */}
          {isLoadingMore && (
            <div className="flex justify-center py-10">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 border-4 border-primary-400/40 rounded-full animate-ping"></div>
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BrandsPage;
