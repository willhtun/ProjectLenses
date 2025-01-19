import './PhotoThumbnail.css'
import React from 'react';
import PhotoDetails from './PhotoDetails';

class PhotoThumbnail extends React.Component {
  constructor(props) {
    super(props); 
    this.state = { showPhoto: false }
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.photo_thumbnail_url = this.props.photoData["s3_thumbnail_url"]
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.showPhoto(false)
    }
  }

  showPhoto = (bool) => {
    this.setState({
      showPhoto: bool
    });
    if (bool) {
      document.body.style.overflow='hidden'
    } else {
      document.body.style.overflow='auto'
    }
  }

  render() {
    return (
      <div style={{ height:"fit-content" }}>
        <button class="photo-thumbnail" style={{ backgroundImage:"url(" + this.photo_thumbnail_url + ")" }} onClick={this.showPhoto.bind(null, true)}>
          <div class="photo-thumbnail-overlay"></div>
        </button>
        { this.state.showPhoto && (
          <div class="photo-details-wrapper">
            <div class="photo-details-background"></div>
            {/* ref={this.wrapperRef} below */}
            <div><PhotoDetails photoData={this.props.photoData} showPhotoHandler={this.showPhoto}></PhotoDetails></div>
          </div>
        ) }
      </div>
    )
  }
}

export default PhotoThumbnail
