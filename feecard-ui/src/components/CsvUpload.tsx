import React, { useState } from 'react';
import axios from 'axios';

const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const submitEndpoint = 'https://l3ru6jv343.execute-api.ap-southeast-2.amazonaws.com/default/FeecardUpload'

  const submitCsv = async () => {
    if (!csvFile) return;

    try {
      const text = await csvFile.text();
      console.log(text);

      const response = await axios.post(
        submitEndpoint,
        text,
        {
          headers: {
            'Content-Type': 'text/csv',
          }
        }
      );
      setUploadStatus(`Success: ${response.status}`);
    } catch (error: any) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const uploadCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      console.log('Uploaded CSV file:', file.name);
    }
  };

  return (
    <div>
      <p>Upload your feecard template in CSV format.</p>
      <input type="file" accept=".csv" onChange={uploadCsv} />
      <button onClick={submitCsv} disabled={!csvFile}>
        Submit
      </button>
    </div>
  );
};

export default CsvUpload;
