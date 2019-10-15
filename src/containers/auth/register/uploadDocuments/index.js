import React, { Component } from 'react';
import DragAndDrop from '../../../../components/common/DragAndDrop';
import Button from '../../../../components/common/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Tooltip } from '../../../../components/common/Tooltip';
import FlashMessage from '../../../../components/common/FlashMessage';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors
} from '../../../../redux/RegisterRedux';

import { Loader } from '../../../../components/Loader';
import './style.scss';

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      error: '',
      successMessage: '',
      checked: false,
      showTooltip: false,
      showFlashMessage: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!!nextProps.successMessage) {
      return {
        error: '',
        successMessage: nextProps.successMessage,
        showFlashMessage: true
      };
    }
    if (!!nextProps.errorMessage) {
      return {
        error: nextProps.errorMessage,
        showFlashMessage: true,
        successMessage: ''
      };
    }
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
    console.log('HIDE FLASH MESSAGE');
    this.props.clearMessages();
    this.setState({ showFlashMessage: false });
  };
  handleSubmit = e => {
    if (this.state.checked && !!this.props.filename) {
      const formData = {
        photoId: this.props.filename
      };

      console.log('WORKS');
      this.props.setFormData(formData);
      this.props.setActiveStep(3);
    } else {
      if (!this.props.filename) {
        this.setState({
          error: 'Please select a file to be uploaded.',
          showFlashMessage: true
        });
      }
      if (!this.state.checked) this.setState({ showTooltip: true });
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
          Please upload a copy of your Passport (photo page), Driver's Licence
          or Government issued I.D
        </p>
        {this.props.isLoading && <Loader />}
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
        {this.state.showFlashMessage && (
          <FlashMessage
            message={this.state.error || this.state.successMessage}
            hideFlashMessage={this.hideFlashMessage}
            variant={this.state.error.length === 0 ? 'success' : 'warning'}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  filename: RegisterSelectors.selectFileName(state),
  isLoading: RegisterSelectors.selectIsLoading(state),
  successMessage: RegisterSelectors.selectSuccessMessage(state),
  errorMessage: RegisterSelectors.selectErrorMessage(state)
});

const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(RegisterActions.setFormData(formData)),
  clearMessages: () => dispatch(RegisterActions.clearMessages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocuments);
