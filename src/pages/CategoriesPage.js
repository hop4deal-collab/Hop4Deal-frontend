// src/pages/AllCategoriesPage.jsx
import React, { Component } from "react";
import { categoriesAPI, brandsAPI } from "../services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

class AllCategoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      brands: [],
      searchTerm: "",
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const [catRes, brandRes] = await Promise.all([
        categoriesAPI.getAll(),
        brandsAPI.getAll(),
      ]);
      this.setState({
        categories: catRes.data,
        brands: brandRes.data,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: "Failed to load categories", loading: false });
    }
  }

  render() {
    const { categories, brands, searchTerm, loading, error } = this.state;

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-purple-600">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-700">
          <p>{error}</p>
        </div>
      );
    }

    const filteredCategories = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-gray-50 relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-500 to-purple-600 text-white py-20 text-center relative overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-2"
          >
            Explore Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="opacity-90 text-lg"
          >
            Browse brands by category and find the best deals & offers.
          </motion.p>

          {/* Floating Search Bar */}
          
        
        </div>
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
                placeholder="Search categories by name..."
                value={searchTerm}
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>

       

        {/* Category Sections */}
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 space-y-16">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-gray-500">
              No categories found matching your search.
            </p>
          ) : (
            filteredCategories.map((cat, idx) => {
              const categoryBrands = brands
                .filter((b) => b.category?._id === cat._id)
                .slice(0, 6);

              return (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-primary-700">
                        {cat.name}
                      </h2>
                      {cat.description && (
                        <p className="text-gray-600">{cat.description}</p>
                      )}
                    </div>
                    <Link
                      to={`/category/${cat._id}`}
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      View All →
                    </Link>
                  </div>

                  {categoryBrands.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                      {categoryBrands.map((b) => (
                        <Link
                          key={b._id}
                          to={`/brandDetail/${b._id}`}
                          className="text-center group"
                        >
                          <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white flex items-center justify-center overflow-hidden">
                              {b.logo ? (
                                <img
                                  src={b.logo}
                                  alt={b.name}
                                  className="w-14 h-14 object-contain group-hover:scale-110 transition"
                                />
                              ) : (
                                <span className="text-primary-600 font-bold text-xl">
                                  {b.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {b.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {b.tagline}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No brands available in this category.
                    </p>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default AllCategoriesPage;
