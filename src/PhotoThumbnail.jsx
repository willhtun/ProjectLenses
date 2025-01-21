import './PhotoThumbnail.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PhotoDetails from './PhotoDetails';

function PhotoThumbnail(props) {
  const [photoState, setPhotoState] = useState(false);
  const photo_thumbnail_url = props.photoData["s3_thumbnail_url"]
  const navigate = useNavigate();

  const showPhoto = (bool) => {
    setPhotoState(bool)
    if (bool) {
      document.body.style.overflow='hidden'
      navigate("/");
    } else {
      document.body.style.overflow='auto'
    }
  }

  return (
    <div style={{ height:"fit-content" }}>
      <button class="photo-thumbnail" style={{ backgroundImage:"url(" + photo_thumbnail_url + ")" }} onClick={showPhoto.bind(null, true)}>
        <div class="photo-thumbnail-overlay"></div>
      </button>
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
