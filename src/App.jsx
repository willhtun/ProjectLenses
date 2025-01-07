import './App.css'
import React from 'react';
import PhotoThumbnail from './PhotoThumbnail.jsx'
import Grid2 from '@mui/material/Grid2';
import axios from 'axios';
import config from '../configuration/prod.json';

class App extends React.Component {
  constructor() {
    super(); 
    this.state = { photoGrids: [] }
    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.setPhotoThumbnails = this.setPhotoThumbnails.bind(this);
    this.grid_column_size = 4;
    this.grid_width = 1260;
  }

  componentDidMount() {
    this.fetchPhotos()
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
          Scenery, buildings and objects evoke emotions in us daily. These are the ones that I experienced from a particular angle, within a specific frame, for a fleeting moment.
        </p>
        <div class="photo-grid">
          <Grid2 container spacing={0} width={this.grid_width}>
            {this.state.photoGrids}
          </Grid2>
        </div>
        <h3>Willem Lu</h3>
      </div>
    )
  }
}

export default App
