import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
const UploadDocuments = () => {
  return (
    <div className="upload-documents__container">
      <p className="sub-heading">
        Please upload a copy of your passport (photo page), drive licence or
        government issued I.D
      </p>
      <div className="upload-documents">
        <label>
          <input type="file" onChange={e => console.log(e.target.files)} />
          <FontAwesomeIcon icon={faCloudUploadAlt} />
        </label>
        <span>Drag and Drop your file(s) here to upload</span>
      </div>
      <p>
        We accept files ending in .JPG .PDF .PNG. Please note the maximum file
        size is 5MB.
      </p>
    </div>
  );
};

export default UploadDocuments;
