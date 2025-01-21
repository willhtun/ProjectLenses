import './PhotoDetails.css'
import React from 'react';
import { useNavigate } from "react-router-dom";

function PhotoDetails(props) {
  const navigate = useNavigate();
  const photo_url = props.photoData["s3_image_url"]
  const photo_title = props.photoData["title"]
  const photo_date = props.photoData["date"]
  const photo_description = props.photoData["description"]
  const photo_description_is_poem = props.photoData["is_poem"]
  const photo_latitude = props.photoData["location"]["latitude"]
  const photo_longitude = props.photoData["location"]["longitude"]
  const photo_location_name = props.photoData["location"]["name"]

  const windowResized = (e) => {
    const handleResize = () => setState({
      isMobile: window.innerWidth < 600? true: false
    });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }

  window.onpopstate = () => {
    props.showPhotoHandler(false)
  }

  const closePhoto = () => {
    navigate(-1)
    props.showPhotoHandler(false)
  }

  return (
    <div class="photo-details">
      <div class="photo-details-left-padding">
        <div class="photo-details-close-wrapper" onClick={closePhoto}>
          <div class="photo-details-close" style={{ backgroundImage:"url(/close.svg)" }}></div>
        </div>
      </div>
      <div class="photo-details-left" style={{ backgroundImage:"url(" + photo_url + ")" }}></div>
      <div class="photo-details-right">
        <div class="photo-details-title">
          <h1>{photo_title}</h1>
          <h2>{photo_date}</h2>
        </div>
        <div class={`photo-details-description${photo_description_is_poem? "-poem": ""}`}>
          <p>{photo_description}</p>
        </div>
        <iframe 
          class="photo-details-location"
          loading="lazy" 
          src={ "https://www.google.com/maps/embed/v1/place?q=" + photo_latitude + "%2C" + photo_longitude + "&key=AIzaSyCzAeGno02JZsVHOHo56uZJLvSn0It6ioE" }>
        </iframe>
        <div class="photo-details-location-text">
          <h3>{photo_location_name}</h3>
        </div>
      </div>
      <div class="photo-details-right-padding"></div>
      <div class="photo-details-close-mobile" onClick={closePhoto}>
        <div class="photo-details-close-mobile-icon" style={{ backgroundImage:"url(/close.svg)" }}></div>
        <div class="photo-details-close-mobile-text">
          <p>back</p>
        </div>
      </div>
    </div> 
  )
}

export default PhotoDetails
