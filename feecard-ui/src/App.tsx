import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import TemplateUploadPage from './components/TemplateUploadPage';
import FeecardReviewPage from './components/FeecardReviewPage';
import './App.css';
import InstructionPage from './components/InstructionPage';

function App() {
  return (
    <Router>
      <div className="layout">
        <nav className="sidebar">
          <h2 className="title">Feecard UI</h2>
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/home" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/instruction" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Instruction
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
            <li>
              <NavLink 
                to="/review" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Review Feecard
              </NavLink>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/instruction" element={<InstructionPage />} />
            <Route path="/upload" element={<TemplateUploadPage />} />
            <Route path="/review" element={<FeecardReviewPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
