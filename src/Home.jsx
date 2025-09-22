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
    axios.get(config.lensesBackendUrl + "/v1/photos/category/still")
      .then(response => {
        setPhotoResponseData(response.data)
        setPhotoThumbnails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const setPhotoThumbnails = (data) => {
    let tempPhotoGrids = []
    data.sort(function(a, b) {return a['sort_key'] - b['sort_key']});
    console.log(data)

    tempPhotoGrids.push(
      <Grid2 size={gridColumnSize}>
        <StillLifeThumbnail photoData={data[1]} stillLife="still"></StillLifeThumbnail>
      </Grid2>
    )

    tempPhotoGrids.push(
      <Grid2 size={gridColumnSize}>
        <StillLifeThumbnail photoData={data[2]} stillLife="life"></StillLifeThumbnail>
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
          As we move forward in time, our paths with the world around us converge and diverge constantly. These are the times when I was compelled to capture the fleeting moment in a frame in the hope of holding onto them for just a little longer.
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
