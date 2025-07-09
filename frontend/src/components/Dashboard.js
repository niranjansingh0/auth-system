import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  // Sample data for the table
  const [tableData] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      department: 'Engineering',
      position: 'Software Developer',
      joinDate: '2023-01-15',
      status: 'Active',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      joinDate: '2023-03-22',
      status: 'Active',
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      department: 'Sales',
      position: 'Sales Representative',
      joinDate: '2023-02-10',
      status: 'Inactive',
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      department: 'HR',
      position: 'HR Specialist',
      joinDate: '2023-04-05',
      status: 'Active',
      avatar: 'SW'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      department: 'Finance',
      position: 'Financial Analyst',
      joinDate: '2023-05-12',
      status: 'Pending',
      avatar: 'DB'
    }
  ]);

  

  useEffect(() => {
    const authData = storage.getAuthData();
    if (authData.user) {
      setUser(authData.user);
    }
  }, []);

  const handleLogout = () => {
    storage.clearAuthData();
    window.location.href = '/login'; 
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge status-${status.toLowerCase()}`}>
        {status}
      </span>
    );
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Filter employees based on search and status
  const filteredData = tableData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || employee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p className="header-subtitle">Welcome back, {user.name}!</p>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <div className="user-avatar">
                {getInitials(user.name)}
              </div>
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                 Logout
              </button>
            </div>
          </div>
        </div>

       

        {/* Employee Management Section */}
        <div className="content-card">
         

          {/* Search and Filter */}
          <div className="table-controls">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Employee Table */}
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee) => (
                 <tr key={employee.id}>
                   <td data-label="Employee">
                     <div className="employee-info">
                       <div className="employee-avatar">
                         {employee.avatar}
                       </div>
                       <div>
                         <div className="employee-name">{employee.name}</div>
                         <div className="employee-email">{employee.email}</div>
                       </div>
                     </div>
                   </td>
                 
                   <td data-label="Department">
                     <span className="department-badge">{employee.department}</span>
                   </td>
                 
                   <td data-label="Position">
                     {employee.position}
                   </td>
                 
                   <td data-label="Join Date">
                     {formatDate(employee.joinDate)}
                   </td>
                 
                   <td data-label="Status">
                     {getStatusBadge(employee.status)}
                   </td>
                 
                   <td data-label="Actions">
                     <div className="action-buttons">
                       <button className="btn-action btn-edit" title="Edit">✏️</button>
                       <button className="btn-action btn-view" title="View">👁️</button>
                       <button className="btn-action btn-delete" title="Delete">🗑️</button>
                     </div>
                   </td>
                 </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="profile-card">
          <h3>Your Profile</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{user.name}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Date of Birth:</span>
              <span className="profile-value">{formatDate(user.dateOfBirth)}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">User ID:</span>
              <span className="profile-value">{user.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;