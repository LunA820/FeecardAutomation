import CsvUpload from "./CsvUpload";
import './TemplateUploadPage.css';


const TemplateUploadPage = () => {
    return <>
        <div className="upload-container">
            <p>Upload your feecard template in CSV format.</p>
            <CsvUpload />
        </div>
    </>
}

export default TemplateUploadPage;