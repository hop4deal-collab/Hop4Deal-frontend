import React, { Component } from 'react';
import { usersAPI } from '../../services/api';

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
      showModal: false,
      editingUser: null,
      formData: {
        email: '',
        password: '',
        privileges: {
          categories: false,
          brands: false,
          deals: false,
          blogs: false,
        },
      },
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      this.setState({
        users: response.data,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading users:', error);
      this.setState({
        error: 'Failed to load users',
        loading: false,
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('privileges.')) {
      const privilege = name.split('.')[1];
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          privileges: {
            ...prevState.formData.privileges,
            [privilege]: checked,
          },
        },
      }));
    } else {
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (this.state.editingUser) {
        await usersAPI.update(this.state.editingUser._id, this.state.formData);
      } else {
        await usersAPI.create(this.state.formData);
      }
      
      this.setState({
        showModal: false,
        editingUser: null,
        formData: {
          email: '',
          password: '',
          privileges: {
            categories: false,
            brands: false,
            deals: false,
            blogs: false,
          },
        },
      });
      
      this.loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user');
    }
  };

  handleEdit = (user) => {
    this.setState({
      editingUser: user,
      formData: {
        email: user.email,
        password: '',
        privileges: user.privileges,
      },
      showModal: true,
    });
  };

  handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(userId);
        this.loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  openModal = () => {
    this.setState({
      showModal: true,
      editingUser: null,
      formData: {
        email: '',
        password: '',
        privileges: {
          categories: false,
          brands: false,
          deals: false,
          blogs: false,
        },
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      editingUser: null,
    });
  };

  render() {
    const { users, loading, error, showModal, formData, editingUser } = this.state;

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
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage data entry users and their privileges</p>
          </div>
          <button
            onClick={this.openModal}
            className="btn-primary"
          >
            Add New User
          </button>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Privileges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(user.privileges).map(([key, value]) => (
                          value && (
                            <span
                              key={key}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                            >
                              {key}
                            </span>
                          )
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => this.handleEdit(user)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h3>
                <form onSubmit={this.handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={this.handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password {editingUser && '(leave blank to keep current)'}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={this.handleInputChange}
                      required={!editingUser}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privileges
                    </label>
                    <div className="space-y-2">
                      {Object.keys(formData.privileges).map((privilege) => (
                        <label key={privilege} className="flex items-center">
                          <input
                            type="checkbox"
                            name={`privileges.${privilege}`}
                            checked={formData.privileges[privilege]}
                            onChange={this.handleInputChange}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">
                            {privilege}
                          </span>
                        </label>
                      ))}
                    </div>
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
                      {editingUser ? 'Update' : 'Create'}
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

export default AdminUsers;

