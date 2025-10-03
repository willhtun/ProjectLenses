import './Main.css'
import React, { useState, useEffect } from 'react';
import StillLifeThumbnail from './StillLifeThumbnail.jsx'
import Grid2 from '@mui/material/Grid2';
import axios from 'axios';
import config from '../configuration/prod.json';

function Home(props) {
  const [photoGrids, setPhotoGrids] = useState([])
  const [photoResponseData, setPhotoResponseData] = useState([])
  const [gridColumnSize, setGridColumnSize] = useState(window.innerWidth < 600? 12: 6)

  useEffect(() => {
    fetchPhotos();
    document.body.style.overflow = 'auto';
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (photoResponseData.length > 0) {
      setPhotoThumbnails(photoResponseData)
    }
  }, [gridColumnSize]);

  const handleResize = () => {
    setGridColumnSize(window.innerWidth < 600? 12: 6)
  }

  const fetchPhotos = () => {
    axios.get(config.lensesBackendUrl + "/v1/photos/category/life")
      .then(response => {
        setPhotoResponseData(response.data)
        setPhotoThumbnails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Still
  const setPhotoThumbnails = (data) => {
    let tempPhotoGrids = []
    data.sort(function(a, b) {return a['sort_key'] - b['sort_key']});
    console.log(data)

    let stillThumbnail = {
      s3_thumbnail_url: "https://lenses-raw-photos.s3.us-west-1.amazonaws.com/lands_end.jpg"
    }

    let lifeThumbnail = {
      s3_thumbnail_url: "https://lenses-raw-photos.s3.us-west-1.amazonaws.com/ollantaytambo_ladies_thumbnail.jpg"
    }

    // Still 9
    tempPhotoGrids.push(
      <Grid2 size={gridColumnSize}>
        <StillLifeThumbnail photoData={stillThumbnail} stillLife="still" homeYPositionOverride="50%"></StillLifeThumbnail>
      </Grid2>
    )
 
    // Life 11
    tempPhotoGrids.push(
      <Grid2 size={gridColumnSize}>
        <StillLifeThumbnail photoData={lifeThumbnail} stillLife="life" homeYPositionOverride="83%"></StillLifeThumbnail>
      </Grid2>
    )

    setPhotoGrids(tempPhotoGrids);
  }

  if (photoGrids.length == 0) {
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        <h2>Through My</h2>
        <h1>L E N S E S</h1>
        <p>
          As we walk through life, we constantly cross paths and part ways with the world and people around us. These are the moments I managed to capture in a frame, in the hope of holding onto them for just a little longer.
        </p>
        <div class="photo-grid">
          <Grid2 container spacing={0}>
            {photoGrids}
          </Grid2>
        </div>
        <div class="contacts-container">
          <a target="_blank" href="mailto:willhtun42@email.com" style={{ backgroundImage:"url(/email.svg)" }} class="contacts-email">
            <p>willhtun42@gmail.com</p>
          </a>
          <a target="_blank" href="https://www.instagram.com/thewillfortography/" style={{ backgroundImage:"url(/instagram.svg)" }} class="contacts-instagram">
            <p>@willfortography</p>
          </a>
          <h4>© 2025 by Willem Lu</h4>
        </div>
      </div>
    )
  }
}

export default Home
