import React, { Component } from 'react';
import { authAPI } from '../services/api';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.checkAuthStatus();
  }

  checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.setState({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  login = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await authAPI.login(credentials);
      console.log('Login response:', response.data);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      this.setState({
        token,
        user,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  hasPrivilege = (privilege) => {
    const { user } = this.state;
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.privileges[privilege] || false;
  };

  isAdmin = () => {
    const { user } = this.state;
    return user && user.role === 'admin';
  };

  isDataEntry = () => {
    const { user } = this.state;
    return user && user.role === 'dataEntry';
  };

  render() {
    const value = {
      ...this.state,
      login: this.login,
      logout: this.logout,
      hasPrivilege: this.hasPrivilege,
      isAdmin: this.isAdmin,
      isDataEntry: this.isDataEntry,
    };

    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext, AuthProvider };
