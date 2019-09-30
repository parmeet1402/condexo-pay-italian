import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = { drag: false };
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
    }
    // file type check
    const fileTypes = ['pdf', 'png', 'jpg', 'jpeg', 'docx', 'xlsx'];
    const imageType = image.type;
    if (!fileTypes.includes(imageType.substring(imageType.indexOf('/') + 1)))
      this.props.setError('Unrecognised file type');
  };
  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Drop');
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      if (files.length > 2) {
        this.props.setError('Maximum 2 files are allowed.');
      } else {
        // filelist from props
        let fileList = this.props.files;
        for (let i = 0; i < files.length; i++) {
          this.validateImage(files[i]);
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
              console.log('<=- Image Data List -=>');
              file.src = reader.result.toString();
            };
            reader.readAsDataURL(files[i]);
            fileList.push(file);
          }
        }
        this.props.addFiles(fileList);
      }
    }
  };

  handleFileChange = e => {
    const { files } = e.target;
    //
  };

  render() {
    return (
      <div
        className="drag-and-drop"
        style={{ display: 'inline-block', position: 'relative' }}
        ref={this.dropRef}
      >
        <div className="upload-documents">
          <label>
            <input type="file" onChange={e => this.handleFileChange(e)} />
            <FontAwesomeIcon icon={faCloudUploadAlt} />
          </label>
          <span>Drag and Drop your file(s) here to upload</span>
        </div>
      </div>
    );
  }
}

export default DragAndDrop;
