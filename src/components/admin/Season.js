import React, { Component } from 'react';
import { seasonsAPI } from '../../services/api';
import { toast } from 'react-toastify';

class AdminSeasons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: [],
      loading: true,
      error: null,
      showModal: false,
      editingSeason: null,
      formData: {
        name: '',
        description: '',
        isActive: true,
        logo: null,
      },
    };
  }

  componentDidMount() {
    this.loadSeasons();
  }

  loadSeasons = async () => {
    try {
      const response = await seasonsAPI.getAll();
      console.log('Seasons loaded:', response.data);
      this.setState({ seasons: response.data, loading: false });
    } catch (error) {
      console.error('Error loading seasons:', error);
      this.setState({ error: 'Failed to load seasons', loading: false });
      toast.error('Failed to load seasons.');
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

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          logo: file,
        },
      }));
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (this.state.editingSeason) {
        await seasonsAPI.update(this.state.editingSeason._id, this.state.formData);
        toast.success('Season updated successfully!');
      } else {
        await seasonsAPI.create(this.state.formData);
        toast.success('Season created successfully!');
      }
      this.setState({
        loading: true,
      })
     setTimeout(() => {
          this.loadSeasons();
      }, 350);
      

    this.setState({
      showModal: false,
      editingSeason: null,
      formData: {
        name: '',
        description: '',
        isActive: true,
        logo: '',
      },
    });
    } catch (error) {
      console.error('Error saving Season:', error);
      toast.error('Failed to save Season. Please try again.');
    }
  };

  handleEdit = (season) => {
    console.log('Editing season:', season);
    this.setState({
      editingSeason: season,
      formData: {
        name: season.name,
        description: season.description,
        isActive: season.isActive,
        logo: null,
      },
      showModal: true,
    });
  };

  handleDelete = async (seasonId) => {
    if (window.confirm('Are you sure you want to delete this season?')) {
      try {
        await seasonsAPI.delete(seasonId);
        this.loadSeasons();
        toast.success('Season deleted successfully!');
      } catch (error) {
        console.error('Error deleting season:', error);
        toast.error('Failed to delete season.');
      }
    }
  };

  openModal = () => {
    this.setState({
      showModal: true,
      editingSeason: null,
      formData: { name: '', description: '', logo: '', isActive: true },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, editingSeason: null });
  };

  render() {
    const { seasons, loading, error, showModal, formData, editingSeason } = this.state;

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Season / Event Management</h1>
            <p className="text-gray-600 mt-2">Manage promotional seasons and events</p>
          </div>
          <button onClick={this.openModal} className="btn-primary w-fit" style={seasons?.length > 0 ? {} : {marginLeft:450} }>
            Add New Season
          </button>
        </div>

        {/* Seasons Grid */}
        {/* Seasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasons.map((season) => (
            <div
              key={season._id}
              className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden"
            >
              {/* Banner Image */}
              {season.logo ? (
                <img
                  src={season.logo}
                  alt={season.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Banner Uploaded
                </div>
              )}

              {/* Card Content */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {season.name}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => this.handleEdit(season)}
                      className="text-primary-600 hover:text-primary-900 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => this.handleDelete(season._id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{season.description}</p>
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
                  {editingSeason ? 'Edit Event / Season' : 'Add New Event / Season'}
                </h3>

                <form onSubmit={this.handleSubmit} className="space-y-4">
                  {/* Season Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Event / Season Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={this.handleInputChange}
                      placeholder="e.g. Black Friday, Christmas Sale"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={this.handleInputChange}
                      placeholder="Write a short description about the event..."
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                   <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={this.handleInputChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Active Season
                    </label>
                  </div>

                  {/* Banner Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Banner Image
                    </label>
                    <input
                      type="file"
                      name="logo"
                      onChange={this.handleFileChange}

                      accept=".png, .jpg, .jpeg, .gif, .webp"
                      className="mt-1 block w-full text-sm text-gray-700 
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-md file:border file:border-gray-300 
                         file:text-sm file:font-semibold 
                         file:bg-gray-50 file:text-gray-700 
                         hover:file:bg-gray-100"
                    />
                  </div>



                  {/* Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={this.closeModal}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingSeason ? 'Update' : 'Create'}
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

export default AdminSeasons;
