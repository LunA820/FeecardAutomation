import React from 'react';
import './InstructionPage.css';

const InstructionPage = () => {
  return (
    <div className="instruction-container">
      <h1>Feecard Template Format</h1>
      <div className="section-divider"></div>

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

      <h3>Example</h3>
      <pre className="csv-example">
,12,24,36,48,60<br />
A,1.20%,1.20%,1.20%,2.40%,3.60%<br />
B,2.40%,2.40%,2.40%,3.00%,3.00%<br />
C,3.00%,4.00%,4.00%,4.00%,4.00%
      </pre>

      <p className="instruction-note">
        After preparing your template, head over to the <strong>Upload Template</strong> page to submit it.<br />
        You can then verify the latest uploaded feecard using the <strong>Review</strong> page.
      </p>
    </div>
  );
};

export default InstructionPage;
