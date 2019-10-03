import React, { Component } from 'react';
import DragAndDrop from '../../../../components/common/DragAndDrop';
import Button from '../../../../components/common/Button';
import Checkbox from '@material-ui/core/Checkbox';
import './style.scss';

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      error: '',
      checked: false
    };
  }
  setFiles = files => {
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

  handleCheckbox = e => {
    this.setState((prevState, props) => ({ checked: !prevState.checked }));
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
          error={this.state.error}
          setFiles={files => this.setFiles(files)}
          clearError={() => this.clearError()}
          setError={error => this.setError(error)}
        />
        <span>{this.state.error}</span>
        <p className="info-text">
          We accept files ending in .JPG .PDF .PNG. Please note the maximum file
          size is 5MB.
        </p>

        <Checkbox
          checked={this.state.checked}
          onChange={this.handleCheckbox}
          value="checked"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        {/* InputProps={{
          startAdornment: (
            <InputAdornment className="start-adornment" position="start">
              <HelpIcon className="help-icon" style={{ cursor: 'pointer' }} />
              <Tooltip>
                Please use a mix of numbers and letters. Must include at least
                one capital letter
              </Tooltip>
            </InputAdornment>
          ), */}
        <div className="buttons__container">
          <Button
            variant="outlined"
            size="large"
            onClick={() => this.props.setActiveStep(1)}
          >
            Back
          </Button>
          <Button
            color="primary"
            size="large"
            onClick={() => this.props.setActiveStep(3)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default UploadDocuments;
