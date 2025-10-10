import React, { Component } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserSidebar from '../components/UserSidebar';
import UserOverview from '../components/user/UserOverview';
import UserCategories from '../components/user/UserCategories';
import UserBrands from '../components/user/UserBrands';
import UserDeals from '../components/user/UserDeals';
import UserBlogs from '../components/user/UserBlogs';

// Wrapper component to use useLocation hook
const UserDashboardWrapper = () => {
  const location = useLocation();
  return <UserDashboard location={location} />;
};

class UserDashboard extends Component {
  static contextType = AuthContext;

  render() {
    const { user } = this.context;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <UserSidebar user={user} location={this.props.location} />
          <main className="flex-1 ml-64">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
                  <Route path="/dashboard" element={<UserOverview />} />
                  {user.privileges.categories && (
                    <Route path="/categories" element={<UserCategories />} />
                  )}
                  {user.privileges.brands && (
                    <Route path="/brands" element={<UserBrands />} />
                  )}
                  {user.privileges.deals && (
                    <Route path="/deals" element={<UserDeals />} />
                  )}
                  {user.privileges.blogs && (
                    <Route path="/blogs" element={<UserBlogs />} />
                  )}
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default UserDashboardWrapper;
