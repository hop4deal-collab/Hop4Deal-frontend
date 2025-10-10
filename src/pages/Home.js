import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      const [dealsResponse, brandsResponse, blogsResponse, categoriesResponse] = await Promise.all([
        dealsAPI.getAll({ isHot: true }),
        brandsAPI.getAll(),
        blogsAPI.getAll({ featured: true }),
        categoriesAPI.getAll(),
      ]);

      this.setState({
        hotDeals: dealsResponse.data,
        trendingBrands: brandsResponse.data.slice(0, 6), // Show top 6 brands
        featuredBlogs: blogsResponse.data,
        categories: categoriesResponse.data,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      this.setState({
        error: 'Failed to load data',
        loading: false,
      });
    }
  };

  render() {
    const { hotDeals, trendingBrands, featuredBlogs, categories, loading, error } = this.state;

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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Welcome to Hop4Deals
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Discover amazing deals, trending brands, and exclusive offers
              </p>
              <div className="flex justify-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md">
                  <p className="text-lg">
                    🎉 Get up to 50% off on your favorite brands!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-6 py-4">
              <a href="#hot-deals" className="text-primary-700 hover:text-primary-900 font-medium">Deals</a>
              <a href="#categories" className="text-primary-700 hover:text-primary-900 font-medium">Categories</a>
              <a href="#trending-brands" className="text-primary-700 hover:text-primary-900 font-medium">Brands</a>
              <a href="#featured-blogs" className="text-primary-700 hover:text-primary-900 font-medium">Blogs</a>
            </div>
          </div>
        </div>

        {/* Hot Deals Section */}
        <div id="hot-deals" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Hot Deals</h2>
                <p className="text-lg text-gray-600">Don't miss out on these amazing offers!</p>
              </div>
              <Link to="/deals" className="text-primary-700 hover:text-primary-900 font-medium">Show all</Link>
            </div>
            
            {hotDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotDeals.slice(0, 4).map((deal) => (
                  <div key={deal._id} className="card card-hover">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        {deal.percentOff}% OFF
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(deal.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {deal.brand?.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{deal.description}</p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Use Code:</p>
                      <p className="font-mono text-lg font-bold text-primary-600">
                        {deal.code}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No hot deals available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Browse Categories */}
        <div id="categories" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">📚 Browse Categories</h2>
                <p className="text-lg text-gray-600">Explore deals by category</p>
              </div>
              <Link to="/categories" className="text-primary-700 hover:text-primary-900 font-medium">Show all</Link>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.slice(0, 6).map((cat) => (
                  <a key={cat._id} href="#hot-deals" className="card card-hover text-center py-4">
                    <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No categories available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Trending Brands Section */}
        <div id="trending-brands" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">⭐ Trending Brands</h2>
                <p className="text-lg text-gray-600">Discover popular brands and their latest offers</p>
              </div>
              <Link to="/brands" className="text-primary-700 hover:text-primary-900 font-medium">Show all</Link>
            </div>
            
            {trendingBrands.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {trendingBrands.slice(0, 6).map((brand) => (
                  <Link key={brand._id} to={`/deals?brand=${brand._id}`} className="text-center">
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-full" />
                        ) : (
                          <span className="text-2xl font-bold text-primary-600">
                            {brand.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{brand.name}</h3>
                      <p className="text-sm text-gray-600">{brand.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No brands available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Blogs Section */}
        <div id="featured-blogs" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">📰 Featured Blogs</h2>
                <p className="text-lg text-gray-600">Stay updated with the latest trends and tips</p>
              </div>
              <Link to="/blogs" className="text-primary-700 hover:text-primary-900 font-medium">Show all</Link>
            </div>
            
            {featuredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBlogs.slice(0, 4).map((blog) => (
                  <div key={blog._id} className="card card-hover">
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.headline}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {blog.headline}
                    </h3>
                    <p className="text-gray-600 mb-4">{blog.description}</p>
                    <div className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No featured blogs available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Hop4Deals</h3>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for the best deals and offers
              </p>
              <p className="text-sm text-gray-500">
                © 2024 Hop4Deals. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
