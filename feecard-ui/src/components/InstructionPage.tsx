import { NavLink } from 'react-router-dom';
import './InstructionPage.css';

const InstructionPage = () => {
  const handleDownload = () => {
    const csvContent = `,12,24,36,48,60,72,84,120
A,1.20%,1.20%,1.20%,2.40%,3.60%,3.60%,3.60%,4.00%
B,2.40%,2.40%,2.40%,3.00%,3.00%,3.00%,4.00%,5.00%
C,3.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%
D,3.00%,6.00%,6.00%,6.00%,7.00%,8.00%,9.00%,10.00%
E,1.20%,1.20%,1.20%,2.40%,3.60%,3.60%,3.60%,4.00%
F,2.40%,2.40%,2.40%,3.00%,3.00%,3.00%,4.00%,5.00%
G,3.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%,4.00%
H,3.00%,6.00%,6.00%,6.00%,7.00%,8.00%,9.00%,10.00%`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up
  };

  return (
    <div className="instruction-container">
      <h1 className="page-title">Feecard Template Format</h1>
      <div className="section-divider"></div>

      <p className="instruction-subtitle">
        This template defines how interest rates vary by credit category and loan term.
      </p>

      <button className="download-button" onClick={handleDownload}>
        Download Template
      </button>


      <p>
        The feecard CSV template defines interest rates for different <strong>loan terms</strong> and <strong>credit categories</strong>.
        It is structured as an <em>m × n</em> matrix.
      </p>

      <h3>Format Rules</h3>
      <ul>
        <li><strong>Row 1</strong>: Loan terms (in months, integers like 12, 24, 36...)</li>
        <li><strong>Column 1</strong>: Credit categories (single uppercase letters A–Z)</li>
        <li><strong>Matrix</strong>: Each cell is an interest rate in percentage format (e.g., <code>3.00%</code>)</li>
      </ul>

      <p className="instruction-note">Example</p>
      <pre className="csv-example">
        ,12,24,36,48,60<br />
        A,1.20%,1.20%,1.20%,2.40%,3.60%<br />
        B,2.40%,2.40%,2.40%,3.00%,3.00%<br />
        C,3.00%,4.00%,4.00%,4.00%,4.00%
      </pre>

      <p>
        After preparing your template, head over to the <NavLink to="/upload" className="inline-link">Upload Template</NavLink> page to submit it.<br />
      </p>
      <p>
        You can then verify the latest uploaded feecard using the <NavLink to="/review" className="inline-link">Review</NavLink> page.
      </p>
    </div>
  );
};

export default InstructionPage;
