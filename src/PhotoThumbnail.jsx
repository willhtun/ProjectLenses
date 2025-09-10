import './PhotoThumbnail.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PhotoDetails from './PhotoDetails';

function PhotoThumbnail(props) {
  const [photoState, setPhotoState] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const photo_thumbnail_url = props.photoData["s3_thumbnail_url"];
  const photo_navigate_to = props.stillLife;
  const navigate = useNavigate();

  const showPhoto = (bool) => {
    setPhotoState(bool)
    if (bool) {
      document.body.style.overflow='hidden'
      navigate("/" + photo_navigate_to);
    } else {
      document.body.style.overflow='auto'
    }
  }

  const handleImageLoaded = () => {
    setPhotoLoaded(true)
  }

  return (
    <div style={{ height:"fit-content" }}>
      <div class="photo-thumbnail" onClick={showPhoto.bind(null, true)}>
        {!photoLoaded && <img src={photo_thumbnail_url}></img> }
        <img src={photo_thumbnail_url} onLoad={handleImageLoaded}></img>
      </div>

      { photoState && (
        <div class="photo-details-wrapper">
          <div class="photo-details-background"></div>
          <div><PhotoDetails photoData={props.photoData} showPhotoHandler={showPhoto}></PhotoDetails></div>
        </div>
      ) }
    </div>
  )
}

export default PhotoThumbnail
