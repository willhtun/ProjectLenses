import './PhotoDetails.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function PhotoDetails(props) {
  const navigate = useNavigate();
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const photo_url = props.photoData["s3_image_url"]
  const photo_title = props.photoData["title"]
  const photo_date = props.photoData["date"]
  const photo_latitude = props.photoData["location"]["latitude"]
  const photo_longitude = props.photoData["location"]["longitude"]
  const photo_landscape = props.photoData["landscape"]
  const photo_loading_url = photo_landscape? props.photoData["s3_loading_url"]: props.photoData["s3_thumbnail_url"]

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

  const handleImageLoaded = () => {
    setPhotoLoaded(true)
  }

  return (
    <div class="photo-details">
      <div class="photo-details-left-padding">
        <div class="photo-details-close-wrapper" onClick={closePhoto}>
          <div class="photo-details-close" style={{ backgroundImage:"url(/close.svg)" }}></div>
        </div>
      </div>
      <div class="photo-details-img" style={{ aspectRatio: photo_landscape? "5/4": "4/5" }}>
        {!photoLoaded && <img class="photo-details-img-loading" src={photo_loading_url}></img> }
        <img src={photo_url} onLoad={handleImageLoaded}></img>
        <div class="photo-details-title">
          <h1>{photo_title}</h1>
          <h2>{photo_date}</h2>
          <a href={"https://www.google.com/maps/place/" + photo_latitude + "%2C" + photo_longitude} target="_blank">
            <div class="photo-details-location-icon" style={{ backgroundImage:"url(/location.svg)" }}></div>
          </a>
        </div>
        <div class="photo-details-close-mobile" onClick={closePhoto}>
          <div class="photo-details-close-mobile-icon" style={{ backgroundImage:"url(/close.svg)" }}></div>
          <div class="photo-details-close-mobile-text">
            <p>back</p>
          </div>
        </div>
      </div>
      <div class="photo-details-right-padding"></div>
    </div>
  )
}

export default PhotoDetails
