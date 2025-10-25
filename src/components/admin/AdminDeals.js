import React, { Component } from 'react';
import { dealsAPI, brandsAPI } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AdminDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [],
      brands: [],
      loading: true,
      error: null,
      showModal: false,
      editingDeal: null,
      formData: {
        brand: '',
        startDate: '',
        endDate: '',
        code: '',
        description: '',
        percentOff: '',
        isHot: false,
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const [dealsRes, brandsRes] = await Promise.all([
        dealsAPI.getAll(),
        brandsAPI.getAll(),
      ]);
      
      this.setState({
        deals: dealsRes.data,
        brands: brandsRes.data,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('❌ Failed to load deals or brands!');
      this.setState({
        error: 'Failed to load data',
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
      const submitData = {
        ...this.state.formData,
        percentOff: parseInt(this.state.formData.percentOff),
      };
      
      if (this.state.editingDeal) {
        await dealsAPI.update(this.state.editingDeal._id, submitData);
        toast.success('✅ Deal updated successfully!');
      } else {
        await dealsAPI.create(submitData);
        toast.success('✅ Deal created successfully!');
      }
      
      this.setState({
        showModal: false,
        editingDeal: null,
        formData: {
          brand: '',
          startDate: '',
          type: 'deal',
          link : '',
          endDate: '',
          code: '',
          description: '',
          percentOff: '',
          isHot: false,
        },
      });
      
      this.loadData();
    } catch (error) {
      console.error('Error saving deal:', error);
      toast.error('❌ Failed to save deal!');
    }
  };

  handleEdit = (deal) => {
    this.setState({
      editingDeal: deal,
      formData: {
        brand: deal.brand._id,
        type:deal.type,
        link: deal.link,
        startDate: new Date(deal.startDate)?.toISOString()?.split('T')[0],
        endDate: new Date(deal.endDate)?.toISOString()?.split('T')[0],
        code: deal.code,
        description: deal.description,
        percentOff: deal?.percentOff?.toString(),
        isHot: deal.isHot,
      },
      showModal: true,
    });
  };

  handleDelete = async (dealId) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealsAPI.delete(dealId);
        toast.success('🗑️ Deal deleted successfully!');
        this.loadData();
      } catch (error) {
        console.error('Error deleting deal:', error);
        toast.error('❌ Failed to delete deal!');
      }
    }
  };

  openModal = () => {
    this.setState({
      showModal: true,
      editingDeal: null,
      formData: {
        brand: '',
        startDate: '',
        endDate: '',
        code: '',
        description: '',
        percentOff: '',
        isHot: false,
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      editingDeal: null,
    });
  };

  render() {
    const { deals, brands, loading, error, showModal, formData, editingDeal } = this.state;

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

    const filteredDeals = this.state.selectedBrand
      ? deals.filter((deal) => deal.brand?._id === this.state.selectedBrand)
      : deals;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deal Management</h1>
            <p className="text-gray-600 mt-2">Manage deals and promotional offers</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Brand Filter Dropdown */}
            <select
              onChange={(e) => this.setState({ selectedBrand: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
              value={this.state.selectedBrand || ""}
            >
              <option value="">All Brands</option>
              {this.state.brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>

            {/* Add New Deal Button */}
            <button
              onClick={this.openModal}
              className="btn-primary whitespace-nowrap"
            >
              Add New Deal
            </button>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <div key={deal._id} className="card card-hover">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{deal.brand?.name}</h3>
                  <p className="text-sm text-gray-500">{deal.brand?.category?.name}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => this.handleEdit(deal)}
                    className="text-primary-600 hover:text-primary-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleDelete(deal._id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  { deal.type !== 'offer' && <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {deal.percentOff}% OFF
                  </span>}
                  { deal.type === 'offer' && <span className="bg-yellow-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    OFFER
                  </span>}
                  {deal.isHot && deal.type !== 'offer' && (
                    <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      🔥 HOT
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{deal.description}</p>
                { deal.type !== 'offer' && <div className="bg-gray-100 p-2 rounded">
                  <p className="text-xs text-gray-600 mb-1">Code:</p>
                  <p className="font-mono text-sm font-bold text-primary-600">{deal.code}</p>
                </div>}
              </div>
              
              { deal.type !== 'offer' &&<div className="text-xs text-gray-500">
                <p>Start: {new Date(deal.startDate).toLocaleDateString()}</p>
                <p>End: {new Date(deal.endDate).toLocaleDateString()}</p>
              </div>}
            </div>
          ))}
        </div>

        {/* Toast container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingDeal ? 'Edit Deal' : 'Add New Deal'}
                </h3>
                <form onSubmit={this.handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={this.handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a brand</option>
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
    <label className="block text-sm font-medium text-gray-700">Redirect Link</label>
    <input
      type="url"
      name="link"
      value={formData.link}
      onChange={this.handleInputChange}
      placeholder="https://example.com"
      required
      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
    />
  </div>

                   <div>
    <label className="block text-sm font-medium text-gray-700">Type</label>
    <div className="flex space-x-4 mt-1">
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="type"
          value="deal"
          checked={formData.type === "deal" || !formData.type}
          onChange={this.handleInputChange}
          className="text-primary-500 focus:ring-primary-500"
        />
        <span>Deal</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="type"
          value="offer"
          checked={formData.type === "offer"}
          onChange={this.handleInputChange}
          className="text-primary-500 focus:ring-primary-500"
        />
        <span>Offer</span>
      </label>
    </div>
  </div>
{formData.type !== "offer" && <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={this.handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={this.handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Deal Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={this.handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                 

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Percentage Off
                    </label>
                    <input
                      type="number"
                      name="percentOff"
                      value={formData.percentOff}
                      onChange={this.handleInputChange}
                      required
                      min="0"
                      max="100"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isHot"
                      checked={formData.isHot}
                      onChange={this.handleInputChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Mark as Hot Deal
                    </label>
                  </div>
</>}
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
                      {editingDeal ? 'Update' : 'Create'}
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

export default AdminDeals;
