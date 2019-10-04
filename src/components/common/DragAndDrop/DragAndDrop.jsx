import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './DragAndDrop.scss';
class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = { drag: false, imageSrc: '' };
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
    await this.props.setError('');
    if (files.length > 2) {
      this.props.setError('Maximum 2 files are allowed.');
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
            this.setState({ imageSrc: file.src });
          };
          reader.readAsDataURL(files[i]);
          fileList.push(file);
        }
      }
      if (this.props.error.length === 0) {
        this.props.setFiles(fileList);
      }
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
            padding: !!this.state.imageSrc ? '0' : '30px',
            maxHeight: '100%',
            border: this.state.imageSrc && !this.props.error && 'none'
          }}
        >
          {this.props.files.length > 0 ? (
            <img
              src={this.state.imageSrc}
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

export default DragAndDrop;
