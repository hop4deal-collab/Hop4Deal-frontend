import React, { Component } from 'react';
import { brandsAPI, categoriesAPI } from '../../services/api';

class UserBrands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      categories: [],
      loading: true,
      error: null,
      showModal: false,
      editingBrand: null,
      formData: {
        name: '',
        description: '',
        logo: '',
        tagline: '',
        category: '',
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const [brandsRes, categoriesRes] = await Promise.all([
        brandsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      
      this.setState({
        brands: brandsRes.data,
        categories: categoriesRes.data,
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

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        logo: file
      }
    }));
  }
};

  handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (this.state.editingBrand) {
        await brandsAPI.update(this.state.editingBrand._id, this.state.formData);
      } else {
        await brandsAPI.create(this.state.formData);
      }
      
      this.setState({
        showModal: false,
        editingBrand: null,
        formData: {
          name: '',
          description: '',
          logo: '',
          tagline: '',
          category: '',
        },
      });
      
      this.loadData();
    } catch (error) {
      console.error('Error saving brand:', error);
      alert('Failed to save brand');
    }
  };

  handleEdit = (brand) => {
    this.setState({
      editingBrand: brand,
      formData: {
        name: brand.name,
        description: brand.description,
        logo: brand.logo,
        tagline: brand.tagline,
        category: brand.category._id,
      },
      showModal: true,
    });
  };

  openModal = () => {
    this.setState({
      showModal: true,
      editingBrand: null,
      formData: {
        name: '',
        description: '',
        logo: '',
        tagline: '',
        category: '',
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      editingBrand: null,
    });
  };

  render() {
    const { brands, categories, loading, error, showModal, formData, editingBrand } = this.state;

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
            <h1 className="text-3xl font-bold text-gray-900">Brand Management</h1>
            <p className="text-gray-600 mt-2">Manage brand information and categories</p>
          </div>
          <button
            onClick={this.openModal}
            className="btn-primary"
          >
            Add New Brand
          </button>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand._id} className="card card-hover">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-600 font-bold">
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-gray-500">{brand.category?.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => this.handleEdit(brand)}
                  className="text-primary-600 hover:text-primary-900 text-sm"
                >
                  Edit
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-2">{brand.description}</p>
              {brand.tagline && (
                <p className="text-primary-600 text-sm italic mb-4">"{brand.tagline}"</p>
              )}
              <div className="text-xs text-gray-500">
                Created: {new Date(brand.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingBrand ? 'Edit Brand' : 'Add New Brand'}
                </h3>
                <form onSubmit={this.handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand Name
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
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={this.handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
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

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      name="logo"
                      value={formData.logo}
                      onChange={this.handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div> */}
                   <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Logo Image
                    </label>
                    <input
                      type="file"
                      name="logoFile"
                      accept=".png, .jpg, .jpeg, .gif, .webp"
                      onChange={this.handleFileChange}
                      className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={formData.tagline}
                      onChange={this.handleInputChange}
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
                      {editingBrand ? 'Update' : 'Create'}
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

export default UserBrands;

