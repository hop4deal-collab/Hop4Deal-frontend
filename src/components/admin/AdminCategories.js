import React, { Component } from 'react';
import { categoriesAPI } from '../../services/api';

class AdminCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
      error: null,
      showModal: false,
      editingCategory: null,
      formData: {
        name: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      this.setState({
        categories: response.data,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading categories:', error);
      this.setState({
        error: 'Failed to load categories',
        loading: false,
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (this.state.editingCategory) {
        await categoriesAPI.update(this.state.editingCategory._id, this.state.formData);
      } else {
        await categoriesAPI.create(this.state.formData);
      }
      
      this.setState({
        showModal: false,
        editingCategory: null,
        formData: {
          name: '',
          description: '',
        },
      });
      
      this.loadCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  handleEdit = (category) => {
    this.setState({
      editingCategory: category,
      formData: {
        name: category.name,
        description: category.description,
      },
      showModal: true,
    });
  };

  handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoriesAPI.delete(categoryId);
        this.loadCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  openModal = () => {
    this.setState({
      showModal: true,
      editingCategory: null,
      formData: {
        name: '',
        description: '',
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      editingCategory: null,
    });
  };

  render() {
    const { categories, loading, error, showModal, formData, editingCategory } = this.state;

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
            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
            <p className="text-gray-600 mt-2">Manage product categories</p>
          </div>
          <button
            onClick={this.openModal}
            className="btn-primary"
          >
            Add New Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="card card-hover">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => this.handleEdit(category)}
                    className="text-primary-600 hover:text-primary-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleDelete(category._id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="text-xs text-gray-500">
                Created: {new Date(category.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <form onSubmit={this.handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                      {editingCategory ? 'Update' : 'Create'}
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

export default AdminCategories;

