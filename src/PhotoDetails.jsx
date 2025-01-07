import './PhotoDetails.css'
import React from 'react';

class PhotoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.photo_url = this.props.photoData["s3_image_url"]
    this.photo_title = this.props.photoData["title"]
    this.photo_date = this.props.photoData["date"]
    this.photo_description = this.props.photoData["description"]
    this.photo_latitude = this.props.photoData["location"]["latitude"]
    this.photo_longitude = this.props.photoData["location"]["longitude"]
    this.photo_location_name = this.props.photoData["location"]["name"]
  }

  openMaps = () => {
    window.open("https://www.google.com/maps/place/" + this.photo_latitude + "+" + this.photo_longitude, "_blank")
  }

  render() {
    return (
      <div class="photo-details">
        <div class="photo-details-left" style={{ backgroundImage:"url(" + this.photo_url + ")" }}></div>
        <div class="photo-details-right">
          <div class="photo-details-title">
            <h1>{this.photo_title}</h1>
            <h2>{this.photo_date}</h2>
          </div>
          <div class="photo-details-description">
            <p>{this.photo_description}</p>
          </div>
          <button class="photo-details-location" onClick={this.openMaps.bind(null, true)}></button>
          <div class="photo-details-location-text">
            <h3>{this.photo_location_name}</h3>
          </div>
        </div>
      </div> 
    )
  }
}

export default PhotoDetails
