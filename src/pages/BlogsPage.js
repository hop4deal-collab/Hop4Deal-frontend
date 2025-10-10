import React, { Component } from 'react';
import { blogsAPI } from '../services/api';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: true,
      error: null,
      searchTerm: '',
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
      this.setState({ error: 'Failed to load blogs', loading: false });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getFilteredBlogs = () => {
    const { blogs, searchTerm } = this.state;
    const term = searchTerm.trim().toLowerCase();
    if (!term) return blogs;
    return blogs.filter((b) => (b.headline || '').toLowerCase().includes(term));
  };

  render() {
    const { loading, error, searchTerm } = this.state;
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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Blogs</h1>
                <p className="text-gray-600">Read all of our latest posts</p>
              </div>
              
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search by title</label>
              <input
                type="text"
                value={searchTerm}
                onChange={this.handleSearchChange}
                placeholder="Type a blog title..."
                className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="card card-hover">
                {blog.image && (
                  <img src={blog.image} alt={blog.headline} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.headline}</h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <div className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogsPage;


