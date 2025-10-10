import React, { Component } from 'react';
import { blogsAPI } from '../../services/api';

class UserBlogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: true,
      error: null,
      showModal: false,
      editingBlog: null,
      formData: {
        headline: '',
        description: '',
        content: '',
        image: '',
        isFeatured: false,
      },
    };
  }

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs = async () => {
    try {
      const response = await blogsAPI.getAll();
      this.setState({
        blogs: response.data,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading blogs:', error);
      this.setState({
        error: 'Failed to load blogs',
        loading: false,
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (this.state.editingBlog) {
        await blogsAPI.update(this.state.editingBlog._id, this.state.formData);
      } else {
        await blogsAPI.create(this.state.formData);
      }
      
      this.setState({
        showModal: false,
        editingBlog: null,
        formData: {
          headline: '',
          description: '',
          content: '',
          image: '',
          isFeatured: false,
        },
      });
      
      this.loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    }
  };

  handleEdit = (blog) => {
    this.setState({
      editingBlog: blog,
      formData: {
        headline: blog.headline,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        isFeatured: blog.isFeatured,
      },
      showModal: true,
    });
  };

  openModal = () => {
    this.setState({
      showModal: true,
      editingBlog: null,
      formData: {
        headline: '',
        description: '',
        content: '',
        image: '',
        isFeatured: false,
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      editingBlog: null,
    });
  };

  render() {
    const { blogs, loading, error, showModal, formData, editingBlog } = this.state;

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-2">Manage blog posts and content</p>
          </div>
          <button
            onClick={this.openModal}
            className="btn-primary"
          >
            Add New Blog
          </button>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="card card-hover">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.headline}</h3>
                  {blog.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2 inline-block">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <button
                  onClick={() => this.handleEdit(blog)}
                  className="text-primary-600 hover:text-primary-900 text-sm"
                >
                  Edit
                </button>
              </div>
              
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.headline}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.description}</p>
              
              <div className="text-xs text-gray-500">
                Created: {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                </h3>
                <form onSubmit={this.handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Headline
                    </label>
                    <input
                      type="text"
                      name="headline"
                      value={formData.headline}
                      onChange={this.handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={this.handleInputChange}
                      required
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={this.handleInputChange}
                      required
                      rows={6}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={this.handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={this.handleInputChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Mark as Featured
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={this.closeModal}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      {editingBlog ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserBlogs;

