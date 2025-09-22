import './Main.css'
import React, { useState, useEffect } from 'react';
import PhotoThumbnail from './PhotoThumbnail.jsx'
import Grid2 from '@mui/material/Grid2';
import axios from 'axios';
import config from '../configuration/prod.json';
import { useNavigate } from "react-router-dom";

function StillLife(props) {
  const [photoGrids, setPhotoGrids] = useState([])
  const [photoResponseData, setPhotoResponseData] = useState([])
  const [gridColumnSize, setGridColumnSize] = useState(window.innerWidth < 1300? 6: 4)
  const stillLife = props.stillLife;
  const navigate = useNavigate();

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
    setGridColumnSize(window.innerWidth < 1300? 6: 4)
  }

  const fetchPhotos = () => {
    axios.get(config.lensesBackendUrl + "/v1/photos/category/" + stillLife)
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
    for (let i = 0; i < data.length; i++) {
      tempPhotoGrids.push(
        <Grid2 size={gridColumnSize}>
          <PhotoThumbnail photoData={data[i]} stillLife={stillLife}></PhotoThumbnail>
        </Grid2>
      )
    }
    setPhotoGrids(tempPhotoGrids);
  }

  const backHomeHandler = () => {
    navigate("/")
    props.showPhotoHandler(false)
  }

  if (photoGrids.length == 0) {
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        <div class="still-life-header">
          <h2 class="still-life-h2-left">. .</h2>
          <h2 class="still-life-h2">{stillLife.split('').join(' ').toUpperCase()}</h2>
          <h2 class="still-life-h2-right">. .</h2>
        </div>
        <div class="photo-grid">
          <Grid2 container spacing={0}>
            {photoGrids}
          </Grid2>
        </div>
        <div class="still-life-back-home" onClick={backHomeHandler}>
          <div class="still-life-back-home-icon" style={{ backgroundImage:"url(/close.svg)" }}></div>
          <div class="still-life-back-home-text">
            <p>home</p>
          </div>
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

export default StillLife
