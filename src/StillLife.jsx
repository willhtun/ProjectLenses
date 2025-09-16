import './Main.css'
import React from 'react';
import PhotoThumbnail from './PhotoThumbnail.jsx'
import Grid2 from '@mui/material/Grid2';
import axios from 'axios';
import config from '../configuration/prod.json';

class StillLife extends React.Component {
  constructor(props) {
    super(); 
    this.state = { photoGrids: [], grid_column_size: window.innerWidth < 600? 6: 4 }
    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.setPhotoThumbnails = this.setPhotoThumbnails.bind(this);
    this.windowResized = this.windowResized.bind(this);
    this.stillLife = props.stillLife;
    window.addEventListener('windowResized', (e) => this.windowResized(e));
  }

  componentDidMount() {
    this.fetchPhotos()
    document.body.style.overflow='auto'
  }

  windowResized(e) {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }

  fetchPhotos() {
    axios.get(config.lensesBackendUrl + "/v1/photos/category/" + this.stillLife)
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
    for (let i = 0; i < data.length; i++) {
      tempPhotoGrids.push(
        <Grid2 size={this.grid_column_size}>
          <PhotoThumbnail photoData={data[i]} stillLife={this.props.stillLife}></PhotoThumbnail>
        </Grid2>
      )
    }
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
          <div class="still-life-header">
            <h2 class="still-life-h2-left">. .</h2>
            <h2 class="still-life-h2">{this.props.stillLife.split('').join(' ').toUpperCase()}</h2>
            <h2 class="still-life-h2-right">. .</h2>
          </div>
          <div class="photo-grid">
            <Grid2 container spacing={0}>
              {this.state.photoGrids}
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
}

export default StillLife
