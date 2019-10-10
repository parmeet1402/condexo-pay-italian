import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import RegisterActions, {
  RegisterSelectors
} from '../../../redux/RegisterRedux';

import { connect } from 'react-redux';
import './DragAndDrop.scss';
class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = { drag: false, image: null };
  }
  dropRef = React.createRef();

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);

    this.dragCounter = 0;
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };
  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  validateImage = image => {
    // 5MB file size check
    if (image.size > 5000000) {
      this.props.setError('File size too large.');
      this.props.setFiles([]);
    }
    // file type check
    const fileTypes = ['pdf', 'png', 'jpg', 'jpeg', 'docx', 'xlsx'];
    const imageType = image.type;
    if (!fileTypes.includes(imageType.substring(imageType.indexOf('/') + 1))) {
      this.props.setError('Unrecognised file type');
      this.props.setFiles([]);
    }
  };

  validateAndAddImage = async files => {
    // reset error state
    await this.props.clearError();
    if (files.length > 1) {
      this.props.setError('Maximum 1 file is allowed.');
      this.props.setFiles([]);
    } else {
      let fileList = [];
      for (let i = 0; i < files.length; i++) {
        await this.validateImage(files[i]);
        // if no errors only then update file state
        if (!this.props.error) {
          const reader = new FileReader();
          let file = {
            name: files[i].name,
            size: files[i].size,
            type: files[i].type,
            src: null
          };
          reader.onload = e => {
            file.src = reader.result.toString();
            /* this.setState({image: file}); */
            /* this.setState({ imageSrc: file.src }); */
          };
          reader.readAsDataURL(files[i]);
          fileList.push(file);
          this.props.uploadDocumentRequest(files[i]);
        }
      }
      /* if (this.props.error.length === 0) {
        this.props.setFiles(fileList);
      } */
    }
  };
  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const { files } = e.dataTransfer;
      this.validateAndAddImage(files);
    }
  };

  handleFileChange = e => {
    const { files } = e.target;
    this.validateAndAddImage(files);
  };

  render() {
    return (
      <div
        className="drag-and-drop"
        style={{ display: 'inline-block', position: 'relative' }}
        ref={this.dropRef}
      >
        <div
          className="upload-documents"
          style={{
            padding:
              !!this.state.image && !!this.state.image.src ? '0' : '30px',
            maxHeight: '100%',
            border:
              this.props.image &&
              this.state.image.src &&
              !this.props.error &&
              'none'
          }}
        >
          {this.props.document.filename ? (
            <img
              src={
                this.props.document.filename &&
                `http://condexopay.api.demos.classicinformatics.com/files/tmp/${this.props.document.filename}`
              }
              alt="uploaded"
              style={{
                maxHeight: '128px',
                maxWidth: '500px'
              }} /* style={{maxHeight:"100%", maxWidth: "100%"}} */
            />
          ) : (
            <>
              <label>
                <input type="file" onChange={e => this.handleFileChange(e)} />
                <FontAwesomeIcon
                  style={{ color: '#999999', width: '49px', height: '34px' }}
                  icon={faCloudUploadAlt}
                />
              </label>
              <span>Drag and Drop your file(s) here to upload</span>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  document: RegisterSelectors.selectDocument(state)
});
const mapDispatchToProps = dispatch => ({
  uploadDocumentRequest: document =>
    dispatch(RegisterActions.uploadDocumentRequest(document))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDrop);
