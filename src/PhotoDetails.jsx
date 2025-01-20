import './PhotoDetails.css'
import React from 'react';

class PhotoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.photo_url = this.props.photoData["s3_image_url"]
    this.photo_title = this.props.photoData["title"]
    this.photo_date = this.props.photoData["date"]
    this.photo_description = this.props.photoData["description"]
    this.photo_description_is_poem = this.props.photoData["is_poem"]
    this.photo_latitude = this.props.photoData["location"]["latitude"]
    this.photo_longitude = this.props.photoData["location"]["longitude"]
    this.photo_location_name = this.props.photoData["location"]["name"]
    this.closePhoto = this.closePhoto.bind(this)
  }

  windowResized(e) {
    const handleResize = () => this.setState({
      isMobile: window.innerWidth < 600? true: false
    });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }

  closePhoto() {
    this.props.showPhotoHandler(false)
  }

  render() {
    return (
      <div class="photo-details">
        <div class="photo-details-left-padding">
          <div class="photo-details-close-wrapper" onClick={this.closePhoto}>
            <div class="photo-details-close" style={{ backgroundImage:"url(./public/close.svg)" }}></div>
          </div>
        </div>
        <div class="photo-details-left" style={{ backgroundImage:"url(" + this.photo_url + ")" }}></div>
        <div class="photo-details-right">
          <div class="photo-details-title">
            <h1>{this.photo_title}</h1>
            <h2>{this.photo_date}</h2>
          </div>
          <div class={`photo-details-description${this.photo_description_is_poem? "-poem": ""}`}>
            <p>{this.photo_description}</p>
          </div>
          <iframe 
            class="photo-details-location"
            loading="lazy" 
            src={ "https://www.google.com/maps/embed/v1/place?q=" + this.photo_latitude + "%2C" + this.photo_longitude + "&key=AIzaSyCzAeGno02JZsVHOHo56uZJLvSn0It6ioE" }>
          </iframe>
          <div class="photo-details-location-text">
            <h3>{this.photo_location_name}</h3>
          </div>
        </div>
        <div class="photo-details-right-padding"></div>
        <div class="photo-details-close-mobile" onClick={this.closePhoto}>
          <div class="photo-details-close-mobile-icon" style={{ backgroundImage:"url(./public/close.svg)" }}></div>
          <div class="photo-details-close-mobile-text">
            <p>back</p>
          </div>
        </div>
      </div> 
    )
  }
}

export default PhotoDetails
