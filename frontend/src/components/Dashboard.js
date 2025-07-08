import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
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
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      joinDate: '2023-03-22',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      department: 'Sales',
      position: 'Sales Representative',
      joinDate: '2023-02-10',
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      department: 'HR',
      position: 'HR Specialist',
      joinDate: '2023-04-05',
      status: 'Active'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      department: 'Finance',
      position: 'Financial Analyst',
      joinDate: '2023-05-12',
      status: 'Pending'
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
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      'Active': 'status-active',
      'Inactive': 'status-inactive',
      'Pending': 'status-pending'
    };
    
    return (
      <span className={`status-badge ${statusClass[status] || 'status-pending'}`}>
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              {getInitials(user.name)}
            </div>
            <div className="user-details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Employee Management</h2>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Join Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{formatDate(employee.joinDate)}</td>
                  <td>{getStatusBadge(employee.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>User Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Date of Birth:</strong> {formatDate(user.dateOfBirth)}
            </div>
            <div>
              <strong>User ID:</strong> {user.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;