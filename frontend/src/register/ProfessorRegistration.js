import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate()
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        setUploadStatus('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:3001/api/register/professorregistration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadStatus('File uploaded successfully');
      alert(response.data); // handle response from backend
      if (response) navigate('/admindashboard') 
    } catch (error) {
      setUploadStatus('Error uploading file');
      alert(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleUpload}>
        <div className="mb-3">
            <label htmlFor="professordata">
              <strong>Upload Professor Data xlsx file</strong>
            </label>
	    <br/><a href="https://docs.google.com/spreadsheets/d/1xToEGBhentIBCAxXV1OXjI1nLHu9Pq0v/edit?usp=sharing&ouid=108087833834616414061&rtpof=true&sd=true" target="_blank">Download Sample</a><br/>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-success w-50 rounded-0">
            Register Professors
          </button>
	
	       <button onClick={()=>navigate('/ProfessorLogin')} style={{"marginLeft":"10%"}} className="btn btn-success w-30 rounded-0">
            Login
          </button>
          <p>{uploadStatus}</p>
          </form>        
      </div>
    </div>
  );
}

export default Signup;
