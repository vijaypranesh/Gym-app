import React, { useState, useEffect } from 'react';
import '../App.css';

const Dashboard = ({ onLogout }) => {
  const [workouts, setWorkouts] = useState([]);
  const [activityType, setActivityType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  // Fetch user info
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setUsername(data.username);
    } catch (err) {}
  };

  const fetchWorkouts = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/workouts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setWorkouts(data);
      else setError(data.message || 'Failed to fetch workouts');
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => { fetchUser(); fetchWorkouts(); }, []);

  const handleLogWorkout = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ activityType, startTime, endTime })
      });
      const data = await res.json();
      if (res.ok) {
        setActivityType('');
        setStartTime('');
        setEndTime('');
        fetchWorkouts();
      } else {
        setError(data.message || 'Failed to log workout');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          {username && <div className="dashboard-username">Welcome, <b>{username}</b>!</div>}
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
        <form onSubmit={handleLogWorkout} className="log-form">
          <input type="text" placeholder="Activity Type" value={activityType} onChange={e => setActivityType(e.target.value)} required />
          <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
          <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required />
          <button type="submit">Log Workout</button>
        </form>
        {error && <div className="error">{error}</div>}
        <h3>Workout History</h3>
        <div className="workout-table-container">
          <table className="workout-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="3" className="no-workouts">No workouts logged yet.</td></tr>
              ) : (
                workouts.map(w => (
                  <tr key={w._id}>
                    <td><span role="img" aria-label="dumbbell">🏋️‍♂️</span> <strong>{w.activityType}</strong></td>
                    <td>{new Date(w.startTime).toLocaleString()}</td>
                    <td>{new Date(w.endTime).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 