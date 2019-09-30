import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import DragAndDrop from '../../../../components/common/DragAndDrop';
import './style.scss';

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      error: ''
    };
  }
  addFiles = files => {
    this.setState({
      files
    });
  };

  clearError = () => {
    this.setState({
      error: ''
    });
  };

  setError = error => {
    this.setState({
      error
    });
  };
  render() {
    return (
      <div className="upload-documents__container">
        <p className="sub-heading">
          Please upload a copy of your passport (photo page), drive licence or
          government issued I.D
        </p>
        <DragAndDrop
          files={this.state.files}
          addFiles={this.addFiles}
          error={this.state.error}
          clearError={this.clearError}
          setError={this.setError}
        />
        <p>
          We accept files ending in .JPG .PDF .PNG. Please note the maximum file
          size is 5MB.
        </p>
      </div>
    );
  }
}

export default UploadDocuments;
