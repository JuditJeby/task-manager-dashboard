import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('Primary');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        title: taskTitle,
        priority: priority
      });
      setTasks([res.data, ...tasks]);
      setTaskTitle('');
      setPriority('Primary');
    } catch (err) {
      console.error('Error creating record:', err);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.map(task => 
        task._id === id ? res.data : task
      ));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="app-layout">
      <aside className="control-sidebar">
        <div className="brand-header">
          <span className="brand-icon">⚡</span>
          <h2>DO TASK</h2>
        </div>
        
        <form onSubmit={handleAddTask} className="sidebar-form">
          <div className="form-group">
            <label>Task Nomenclature</label>
            <input
              type="text"
              placeholder="E.g., Review Paging Modules..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="sidebar-input"
            />
          </div>

          <div className="form-group">
            <label>Classification Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="sidebar-select"
            >
              <option value="Primary">🔴 Primary Level</option>
              <option value="Secondary">🟡 Secondary Level</option>
              <option value="Tertiary">🔵 Tertiary Level</option>
            </select>
          </div>

          <button type="submit" className="sidebar-btn">Deploy Task</button>
        </form>
      </aside>

      <main className="workspace-view">
        <header className="workspace-header">
          <div className="title-area">
            <h1>Operational Workspace Control</h1>
            <p>Real-time MERN Stack Database Interface Activity Logs</p>
          </div>

          <div className="metrics-row">
            <div className="metric-card card-total">
              <span className="metric-label">Total Allocated</span>
              <span className="metric-value">{totalCount}</span>
            </div>
            <div className="metric-card card-pending">
              <span className="metric-label">Awaiting Execution</span>
              <span className="metric-value">{pendingCount}</span>
            </div>
            <div className="metric-card card-completed">
              <span className="metric-label">Logs Completed</span>
              <span className="metric-value">{completedCount}</span>
            </div>
          </div>
        </header>

        <section className="logs-panel">
          <h3>Active Log Submissions</h3>
          
          {loading ? (
            <p className="status-placeholder">Synchronizing data stream records with MongoDB cluster...</p>
          ) : tasks.length === 0 ? (
            <p className="status-placeholder">🎉 Operational workspace empty. All active logs executed.</p>
          ) : (
            <div className="scrollable-list-wrapper">
              <ul className="task-grid-list">
                {tasks.map((task) => (
                  <li key={task._id} className={`workspace-item ${task.isCompleted ? 'state-done' : ''}`}>
                    <div className="item-left-block">
                      {/* Brand New Explicit Interactive Toggle Button */}
                      <button 
                        type="button" 
                        onClick={() => handleToggleComplete(task._id)}
                        className={`status-toggle-btn ${task.isCompleted ? 'btn-completed' : 'btn-pending'}`}
                      >
                        {task.isCompleted ? '✓ Completed' : 'Mark Done'}
                      </button>
                      <span className="item-title-text">{task.title}</span>
                    </div>
                    
                    <div className="item-right-block">
                      <span className={`badge-pill label-${task.priority?.toLowerCase() || 'primary'}`}>
                        {task.priority || 'Primary'}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteTask(task._id)}
                        className="remove-log-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;