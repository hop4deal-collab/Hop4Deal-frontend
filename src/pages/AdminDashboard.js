import React, { Component } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminUsers from '../components/admin/AdminUsers';
import AdminCategories from '../components/admin/AdminCategories';
import AdminBrands from '../components/admin/AdminBrands';
import AdminDeals from '../components/admin/AdminDeals';
import AdminBlogs from '../components/admin/AdminBlogs';
import AdminOverview from '../components/admin/AdminOverview';

// Wrapper component to use useLocation hook
const AdminDashboardWrapper = () => {
  const location = useLocation();
  return <AdminDashboard location={location} />;
};

class AdminDashboard extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <AdminSidebar location={this.props.location} />
          <main className="flex-1 ml-64">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/dashboard" element={<AdminOverview />} />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/categories" element={<AdminCategories />} />
                  <Route path="/brands" element={<AdminBrands />} />
                  <Route path="/deals" element={<AdminDeals />} />
                  <Route path="/blogs" element={<AdminBlogs />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default AdminDashboardWrapper;
