import React, { Component } from 'react';
import DragAndDrop from '../../../../components/common/DragAndDrop';
import Button from '../../../../components/common/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Tooltip } from '../../../../components/common/Tooltip';
import FlashMessage from '../../../../components/common/FlashMessage';
import { connect } from 'react-redux';
import { RegisterSelectors } from '../../../../redux/RegisterRedux';
import './style.scss';

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      error: '',
      checked: false,
      showTooltip: false,
      showFlashMessage: false
    };
  }
  setFiles = files => {
    this.setState({
      files
    });
  };

  clearError = () => {
    this.setState({
      error: '',
      showFlashMessage: false
    });
  };

  setError = error => {
    this.setState({
      error,
      showFlashMessage: true
    });
  };

  hideFlashMessage = () => {
    this.setState({ showFlashMessage: false });
  };
  handleSubmit = e => {
    if (this.state.checked && this.state.files.length > 0) {
      this.props.setActiveStep(3);
    } else {
      if (this.state.files.length === 0) {
        this.setState({
          error: 'Please select a file to be uploaded.',
          showFlashMessage: true
        });
      }
      this.setState({ showTooltip: true });
    }
  };

  handleCheckbox = e => {
    this.setState((prevState, props) => ({
      checked: !prevState.checked,
      showTooltip: false
    }));
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
        <p className="info-text">
          We accept files ending in .JPG .PDF .PNG. Please note the maximum file
          size is 5MB.
        </p>

        <div className="checkbox-and-tooltip">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckbox}
                value="checked"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="I agree to the terms and conditions and have read the privacy policy"
          />

          {this.state.showTooltip && (
            <Tooltip>
              Please tick the box to agree to the terms and conditions before
              proceeding
            </Tooltip>
          )}
        </div>
        <div className="buttons__container">
          <Button
            variant="outlined"
            size="large"
            onClick={() => this.props.setActiveStep(1)}
          >
            Back
          </Button>
          <Button color="primary" size="large" onClick={this.handleSubmit}>
            Next
          </Button>
        </div>
        {(this.state.showFlashMessage || !!this.props.document.message) && (
          <FlashMessage
            message={this.props.document.message}
            hideFlashMessage={this.hideFlashMessage}
            variant={this.state.error.length === 0 ? 'success' : 'warning'}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    document: RegisterSelectors.selectDocument(state)
  };
};
export default connect(mapStateToProps)(UploadDocuments);
