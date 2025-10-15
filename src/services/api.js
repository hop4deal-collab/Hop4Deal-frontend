import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL ;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Brands API
export const brandsAPI = {
  getAll: () => api.get('/brands'),
  getById: (id) => api.get(`/brands/${id}`),
  create: (brandData) => {
    const formData = new FormData();

    for (const key in brandData) {
      const value = brandData[key];

      // ✅ Append file properly
      if (key === 'logo' && value instanceof File) {
        formData.append('logo', value); // field name must match multer config
      } else {
        formData.append(key, value);
      }
    }
    api.post('/brands', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  },
  update: (id, brandData) => {
     const formData = new FormData();

    for (const key in brandData) {
      const value = brandData[key];

      // ✅ Append file properly
      if (key === 'logo' && value instanceof File) {
        formData.append('logo', value); // field name must match multer config
      } else {
        formData.append(key, value);
      }
    }
    api.put(`/brands/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  },
  delete: (id) => api.delete(`/brands/${id}`),
};

// Deals API
export const dealsAPI = {
  getAll: (params = {}) => api.get('/deals', { params }),
  getById: (id) => api.get(`/deals/${id}`),
  create: (dealData) => api.post('/deals', dealData),
  update: (id, dealData) => api.put(`/deals/${id}`, dealData),
  delete: (id) => api.delete(`/deals/${id}`),
};

// Blogs API
export const blogsAPI = {
  getAll: (params = {}) => api.get('/blogs', { params }),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (blogData) => api.post('/blogs', blogData),
  update: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  delete: (id) => api.delete(`/blogs/${id}`),
};

export default api;

