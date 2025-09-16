import './Main.css'
import React from 'react';
import StillLifeThumbnail from './StillLifeThumbnail.jsx'
import Grid2 from '@mui/material/Grid2';
import axios from 'axios';
import config from '../configuration/prod.json';

class Still extends React.Component {
  constructor() {
    super(); 
    this.state = { photoGrids: [], grid_column_size: window.innerWidth < 600? 6: 4 }
    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.setPhotoThumbnails = this.setPhotoThumbnails.bind(this);
    this.windowResized = this.windowResized.bind(this);
    window.addEventListener('windowResized', (e) => this.windowResized(e));
  }

  componentDidMount() {
    this.fetchPhotos()
  }

  windowResized(e) {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }

  
  fetchPhotos() {
    axios.get(config.lensesBackendUrl + "/v1/photos/category/still")
      .then(response => {
        this.setPhotoThumbnails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  setPhotoThumbnails(data) {
    let tempPhotoGrids = []
    data.sort(function(a, b) {return a['sort_key'] - b['sort_key']});

    tempPhotoGrids.push(
      <Grid2 size={this.grid_column_size}>
        <StillLifeThumbnail photoData={data[1]} stillLife="still"></StillLifeThumbnail>
      </Grid2>
    )

    tempPhotoGrids.push(
      <Grid2 size={this.grid_column_size}>
        <StillLifeThumbnail photoData={data[2]} stillLife="life"></StillLifeThumbnail>
      </Grid2>
    )

    this.setState({
      photoGrids: tempPhotoGrids
    });
  }

  render() {
    if (this.state.photoGrids.length == 0) {
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
              {this.state.photoGrids}
            </Grid2>
          </div>
          <div class="contacts-container-fixed-bottom">
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
}

export default Still
