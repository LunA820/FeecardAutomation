import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import TemplateUploadPage from './components/TemplateUploadPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="layout">
        <nav className="sidebar">
          <h2 className="title">Feecard UI</h2>
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/upload" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Upload Template
              </NavLink>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upload" element={<TemplateUploadPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
