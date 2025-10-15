// src/components/Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dealsAPI, brandsAPI, blogsAPI, categoriesAPI } from '../services/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotDeals: [],
      trendingBrands: [],
      featuredBlogs: [],
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
        const [dealsRes, brandsRes, blogsRes, catsRes] = await Promise.all([
          dealsAPI.getAll(),
          brandsAPI.getAll(),
          blogsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
  
        const deals = dealsRes.data;
        const brands = brandsRes.data;
        const categories = catsRes.data;
  
        // 🧠 Group brands by category
        const categoryBrands = {};
        categories.forEach((cat) => {
          categoryBrands[cat._id] = brands.filter(
            (b) => b.category?._id === cat._id
          );
        });
  
        this.setState({
          hotDeals: deals,
          trendingBrands: brands.slice(0, 6),
          featuredBlogs: blogsRes.data,
          categories,
          categoryBrands,
          loading: false,
        });
      } catch (err) {
        console.error('Error loading data:', err);
        this.setState({ error: 'Failed to load data', loading: false });
      }
    };

  render() {
    const { hotDeals, trendingBrands, featuredBlogs, categories, loading, error } = this.state;

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <motion.div
            className="w-16 h-16 border-4 border-primary-500 border-dashed rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-700 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Hero Section */}
        <motion.div
          className="relative text-white overflow-hidden"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Gradient Background */}
          <div
            className="
              absolute inset-0 
              bg-gradient-to-r from-primary-500 via-primary-700 to-primary-900 
              bg-[length:200%_200%] 
              animate-gradient-xy
            "
          />
          <div className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent via-primary-300 from-primary-400 to-primary-700 bg-gradient-to-r"
              animate={{ scale: [0.95, 1.05, 0.98, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Welcome to Hop4Deals
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8"
              whileHover={{ scale: 1.05, color: '#E9D5FF' }}
              transition={{ duration: 0.3 }}
            >
              Discover amazing deals, trending brands, and exclusive offers
            </motion.p>
            <motion.div
              className="inline-block bg-white bg-opacity-20 rounded-lg p-5"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.4)' }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg">
                🎉 Up to <span className="font-bold text-primary-800">50% OFF</span> on your favorite brands!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-6 py-4">
              <a href="#hot-deals" className="text-primary-700 hover:text-primary-900 font-medium transition">Deals</a>
              <a href="#categories" className="text-primary-700 hover:text-primary-900 font-medium transition">Categories</a>
              <a href="#trending-brands" className="text-primary-700 hover:text-primary-900 font-medium transition">Brands</a>
              <a href="#featured-blogs" className="text-primary-700 hover:text-primary-900 font-medium transition">Blogs</a>
            </div>
          </div>
        </div>

        {/* Hot Deals Section */}
        <motion.section
          id="hot-deals"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-primary-800 mb-2">🔥 Hot Deals</h2>
                <p className="text-lg text-gray-600">Don’t miss out on these exclusive offers!</p>
              </div>
              <Link to="/deals" className="text-primary-600 hover:text-primary-800 font-medium">Show all</Link>
            </div>

            {hotDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotDeals.slice(0, 4).map((deal, idx) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No hot deals available right now.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Browse Categories Section */}
       {/* --- BEAUTIFIED CATEGORIES SECTION --- */}
       <motion.section
  id="categories"
  className="py-20 bg-gradient-to-b from-gray-50 to-white"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-end justify-between mb-12">
      <div>
        <h2 className="text-3xl font-bold text-primary-800 mb-2">
          📂 Browse by Category
        </h2>
        <p className="text-lg text-gray-600">
          Discover top brands and their latest deals
        </p>
      </div>
      <Link
        to="/categories"
        className="text-primary-600 hover:text-primary-800 font-medium"
      >
        Show all categories
      </Link>
    </div>

    {categories.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat) => {
          const brandsInCat = this.state.categoryBrands[cat._id] || [];
          const visibleBrands = brandsInCat.slice(0, 8); // 👈 limit to 8 brands

          return (
            <motion.div
              key={cat._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-primary-400 transition-all p-6 flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
                <h3 className="text-2xl font-bold text-primary-800">
                  {cat.name}
                   <p style={{fontSize:13}}>{cat.description}</p>
                </h3>
               
                {brandsInCat.length > 8 && (
                  <Link
                    to={`/categories/${cat._id}`}
                    className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Show all →
                  </Link>
                )}
              </div>

              {visibleBrands.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  {visibleBrands.map((brand) => {
                    // Hardcoded deal count for now
                    const dealCount = Math.floor(Math.random() * 5) + 1;
                    return (
                      <Link
                        key={brand._id}
                        to={`/deals?brand=${brand._id}`}
                        className="flex items-center gap-3 bg-gray-50 hover:bg-primary-50 p-3 rounded-lg border border-gray-200 hover:border-primary-400 transition-all"
                      >
                        {brand.logo ? (
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center text-lg font-bold text-primary-800">
                            {brand.name.charAt(0)}
                          </div>
                        )}
                        <div className="text-left">
                          <p className="text-primary-800 font-semibold text-sm">
                            {brand.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {dealCount} deal{dealCount > 1 ? 's' : ''}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm mt-4">
                  No brands available in this category yet.
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-500">No categories at the moment.</p>
      </div>
    )}
  </div>
</motion.section>

        {/* Trending Brands Section */}
        <motion.section
          id="trending-brands"
          className="py-16 bg-gray-50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-primary-800 mb-2">⭐ Trending Brands</h2>
                <p className="text-lg text-gray-600">Top brands with deals</p>
              </div>
              <Link to="/brands" className="text-primary-600 hover:text-primary-800 font-medium">Show all</Link>
            </div>

            {trendingBrands.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {trendingBrands.slice(0, 6).map((brand, idx) => (
                  <Link key={brand._id} to={`/deals?brand=${brand._id}`} className="text-center">
                    <motion.div
                      className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl border border-transparent hover:border-primary-500 transition-shadow"
                      whileHover={{ scale: 1.07, rotate: 1 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 120 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary-300 rounded-full flex items-center justify-center">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-full" />
                        ) : (
                          <span className="text-2xl font-bold text-primary-800">
                            {brand.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-primary-800 mb-1">{brand.name}</h3>
                      <p className="text-sm text-gray-600">{brand.tagline}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No trending brands right now.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Featured Blogs Section */}
        <motion.section
          id="featured-blogs"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-primary-800 mb-2">📰 Featured Blogs</h2>
                <p className="text-lg text-gray-600">Latest insights & tips</p>
              </div>
              <Link to="/blogs" className="text-primary-600 hover:text-primary-800 font-medium">Show all</Link>
            </div>

            {featuredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBlogs.slice(0, 3).map((blog, idx) => (
                  <motion.div
                    key={blog._id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl border border-transparent hover:border-primary-500 transition-shadow"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                  >
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.headline}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-primary-800 mb-2">{blog.headline}</h3>
                    <p className="text-gray-700 mb-4">{blog.description}</p>
                    <div className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No featured blogs yet.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Scroll-to-Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 bg-primary-700 text-white p-3 rounded-full shadow-lg hover:bg-primary-900 transition"
        >
          ↑
        </motion.button>

        <motion.section
                  id="reviews"
                  className="py-20 bg-white"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-primary-800 mb-12">
                      💬 What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        {
                          name: 'Emily Johnson',
                          review:
                            'Hop4Deals helped me save so much on my favorite brands! Love the clean design and easy navigation.',
                        },
                        {
                          name: 'Mark Thompson',
                          review:
                            'Found great electronics deals through Hop4Deals. Definitely my go-to site now!',
                        },
                        {
                          name: 'Sophia Lee',
                          review:
                            'Amazing experience — I keep discovering new brands with awesome discounts every week.',
                        },
                      ].map((r, i) => (
                        <motion.div
                          key={i}
                          className="bg-gray-50 p-6 rounded-lg shadow-md border hover:border-primary-400 transition"
                          whileHover={{ scale: 1.05 }}
                        >
                          <p className="text-gray-700 italic mb-4">"{r.review}"</p>
                          <p className="text-primary-800 font-semibold">— {r.name}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

        {/* Footer */}
        <motion.footer
          className="bg-primary-900 text-white py-12 mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Hop4Deals</h3>
            <p className="text-purple-200 mb-4">Your one-stop destination for the best deals</p>
            <p className="text-sm text-purple-300">© {new Date().getFullYear()} Hop4Deals. All rights reserved.</p>
          </div>
        </motion.footer>
      </div>
    );
  }
}

export default Home;
