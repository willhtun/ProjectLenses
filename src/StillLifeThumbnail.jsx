import './StillLifeThumbnail.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PhotoDetails from './PhotoDetails';

function StillLifeThumbnail(props) {
  const [photoState, setPhotoState] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const photo_thumbnail_url = props.photoData["s3_thumbnail_url"];
  const stillLife = props.stillLife;
  const navigate = useNavigate();

  const goToStillLife = () => {
      document.body.style.overflow='hidden'
      navigate("/" + stillLife);
  }

  const handleImageLoaded = () => {
    setPhotoLoaded(true)
  }

  return (
    <div style={{ height:"fit-content" }}>
      <div class="still-life-thumbnail" style={{backgroundImage: "url(" + photo_thumbnail_url + ")"}} onClick={goToStillLife.bind(null)}>
        <h2>{stillLife.split('').join(' ').toUpperCase()}</h2>
      </div>

      { photoState && (
        <div class="still-life-details-wrapper">
          <div class="still-life-details-background"></div>
          <div><PhotoDetails photoData={props.photoData} goToStillLifeHandler={goToStillLife}></PhotoDetails></div>
        </div>
      ) }
    </div>
  )
}

export default StillLifeThumbnail
