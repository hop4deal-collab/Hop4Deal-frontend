import React, { Component } from "react";
import { blogsAPI } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: true,
      error: null,
      searchTerm: "",
      selectedBlog: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const res = await blogsAPI.getAll();
      this.setState({ blogs: res.data, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to load blogs", loading: false });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getFilteredBlogs = () => {
    const { blogs, searchTerm } = this.state;
    const term = searchTerm.trim().toLowerCase();
    if (!term) return blogs;
    return blogs.filter((b) =>
      (b.headline || "").toLowerCase().includes(term)
    );
  };

  render() {
    const { loading, error, searchTerm, selectedBlog } = this.state;
    const blogs = this.getFilteredBlogs();

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
        {/* HERO */}
        <div
          className="relative bg-gradient-to-r from-primary-500 to-purple-600 text-white py-20 overflow-hidden"
          style={{ height: 270 }}
        >
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Insights & Stories 📝
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg opacity-90 max-w-2xl mx-auto"
            >
              Explore Hop4Deal’s latest blogs — tips, insights, and stories that
              help you shop smarter and save more.
            </motion.p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT PANEL */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                About Our Blogs
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our blogs bring you the latest insights on deals, seasonal
                shopping trends, and brand updates — so you never miss a
                saving opportunity.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 text-sm space-y-1">
                <li>Exclusive deal insights</li>
                <li>Shopping guides & brand highlights</li>
                <li>Upcoming event sneak peeks</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 text-sm text-gray-600">
              <h3 className="font-semibold text-gray-800 mb-2">Quick Tips</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Use search to find specific topics.</li>
                <li>Check regularly for fresh content.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Latest Articles
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Stay updated with trends, tips, and exclusive insights written
                by our deal experts.
              </p>
            </div>

            {/* Search */}
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={this.handleSearchChange}
                placeholder="Search blogs..."
                className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.length === 0 ? (
                <p className="text-gray-500 italic">No blogs found.</p>
              ) : (
                blogs.map((blog) => (
                  <div
                    key={blog._id}
                    onClick={() => this.setState({ selectedBlog: blog })}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group cursor-pointer"
                  >
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.headline}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="p-5 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition">
                        {blog.headline}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {blog.description || "No description available."}
                      </p>
                      <span className="text-xs text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* BLOG MODAL */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
              onClick={() => this.setState({ selectedBlog: null })}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]"
              >
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                  onClick={() => this.setState({ selectedBlog: null })}
                >
                  ✕
                </button>

                {selectedBlog.image && (
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.headline}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                )}

                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  {selectedBlog.headline}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(selectedBlog.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-700 mt-4">{selectedBlog.description}</p>

                {selectedBlog.content && (
                  <div className="mt-4 text-gray-800 whitespace-pre-line">
                    {selectedBlog.content}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
}

export default BlogsPage;
