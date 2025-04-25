import './HomePage.css';

const HomePage = () => {
  return (
    <div className="dashboard-text">
      <h1 className="page-title">Feecard Automation UI</h1>
      <div className="section-divider"></div>
      <p>
        Welcome to the <strong>Feecard Automation Tool</strong> — a lightweight interface designed to simplify
        the management of interest rate cards ("feecards") used in loan calculations.
      </p>
      <ul>
        <li><strong>📤 Upload</strong> a CSV-based feecard template via AWS Lambda</li>
        <li><strong>📥 Review</strong> the latest feecard pulled directly from S3</li>
        <li><strong>🌐 Automate</strong> versioning and deployment with AWS Lambda + API Gateway</li>
      </ul>
      <p className="dashboard-note">
        This tool ensures updates are <em>fast</em>, <em>auditable</em>, and <em>low-risk</em>.
        You can find detailed instructions on the Instruction page.
      </p>
    </div>
  );
};

export default HomePage;
