import './App.css'
import React from 'react';
import PhotoThumbnail from './PhotoThumbnail.jsx'
import Grid2 from '@mui/material/Grid2';
import axios from 'axios';
import config from '../configuration/prod.json';

class App extends React.Component {
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
    axios.get(config.lensesBackendUrl + "/v1/photos")
      .then(response => {
        this.setPhotoThumbnails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  setPhotoThumbnails(data) {
    let tempPhotoGrids = []
    for (let i = 0; i < data.length; i++) {
      tempPhotoGrids.push(
        <Grid2 size={this.grid_column_size}>
          <PhotoThumbnail photoData={data[i]}></PhotoThumbnail>
        </Grid2>
      )
    }
    this.setState({
      photoGrids: tempPhotoGrids
    });
  }

  render() {
    return (
      <div>
        <h2>Through My</h2>
        <h1>LENSES</h1>
        <p>
          The world around us is constantly evoking feelings and emotions in us, whether it be through the scenery, structures or mundane objects. These are the ones that sparked me to pull out my camera so that I could capture the fleeting moment, from a particular angle, within a specific frame.
        </p>
        <div class="photo-grid">
          <Grid2 container spacing={0}>
            {this.state.photoGrids}
          </Grid2>
        </div>
        <h3>Willem Lu</h3>
      </div>
    )
  }
}

export default App
