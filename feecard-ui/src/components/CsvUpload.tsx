import React, { useState, useRef } from 'react';
import axios from 'axios';
import './CsvUpload.css'

const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const submitEndpoint = 'https://nmji2zb182.execute-api.ap-southeast-2.amazonaws.com/FeecardAPI/FeecardUpload';
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  console.log(apiKey);

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

      if (response.status !== 200) {
        setUploadStatus(`Fail to upload feecard, please make sure that you upload a valid template.`);
      }
      else{
        setUploadStatus(`Feecard upload success!`);
      }
      setCsvFile(null);
    } catch (error: any) {
      setUploadStatus(`Fail to upload feecard, please make sure that you upload a valid template.`);
      setCsvFile(null);
    }
  };

  const uploadCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      setUploadStatus(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setUploadStatus(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="upload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <p>{csvFile ? csvFile.name : 'Drag & drop CSV here, or click to browse'}</p>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={uploadCsv}
          style={{ display: 'none' }}
        />
      </div>

      <button onClick={submitCsv} disabled={!csvFile}>
        Submit
      </button>

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default CsvUpload;
