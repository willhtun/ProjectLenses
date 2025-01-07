import './Admin.css'
import React from 'react';
import axios from 'axios';
import config from '../configuration/prod.json';
import serialize from 'form-serialize';

class Admin extends React.Component {
  constructor(props) {
    super(props); 
    this.state = { entries: []}
    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.setEntry = this.setEntry.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
  }

  componentDidMount() {
    this.fetchPhotos()
  }

  fetchPhotos() {
    axios.get(config.lensesBackendUrl + "/v1/photos")
      .then(response => {
        this.setEntry(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  setEntry(data) {
    let tempEntries = []
    for (let i = 0; i < data.length; i++) {
      tempEntries.push(
        <div>
          <form class="admin-row-container" onSubmit={this.updateEntry}>
            <textarea readOnly class="admin-row-id" name="id" value={data[i]["id"]}></textarea>
            <textarea class="admin-row-sort" name="sort_key" defaultValue={data[i]["sort_key"]}></textarea>
            <div class="admin-row-thumbnail" style={{ backgroundImage:"url(" + data[i]["s3_thumbnail_url"] + ")" }}></div>
            <textarea class="admin-row-title" name="title" defaultValue={data[i]["title"]}></textarea>
            <textarea class="admin-row-date" name="date" defaultValue={data[i]["date"]}></textarea>
            <textarea class="admin-row-description" name="description" defaultValue={data[i]["description"]}></textarea>
            <textarea class="admin-row-latitude" name="latitude" defaultValue={data[i]["location"]["latitude"]}></textarea>
            <textarea class="admin-row-longitude" name="longitude" defaultValue={data[i]["location"]["longitude"]}></textarea>
            <textarea class="admin-row-location" name="location" defaultValue={data[i]["location"]["name"]}></textarea>
            <input type="submit" value="Update"/>
          </form>
          <hr></hr>
        </div>
      )
    }
    this.setState({
      entries: tempEntries
    });
  }

  updateEntry(event) {
    event.preventDefault()
    let formData = serialize(event.target, { hash: true });
    let payload = {
      "id": formData["id"],
      "sort_key": formData["sort_key"],
      "title": formData["title"],
      "description": formData["description"],
      "date": formData["date"],
      "location": {
        "name": formData["location"],
        "latitude": formData["latitude"],
        "longitude": formData["longitude"]
      }
    }
    axios.put(config.lensesBackendUrl + "/v1/photos/" + formData["id"], payload)
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        alert("Update failed: " + error.message);
      });
  }

  render() {
    return (
      <div>
        Admin
        <br></br>
        <br></br>
        <div class="admin-row-container-header">
            <div class="admin-row-id-header">Id</div>
            <div class="admin-row-sort-header">Sort</div>
            <div class="admin-row-thumbnail-header">Thumbnail</div>
            <div class="admin-row-title-header">Title</div>
            <div class="admin-row-date-header">Date</div>
            <div class="admin-row-description-header">Description</div>
            <div class="admin-row-latitude-header">Latitude</div>
            <div class="admin-row-longitude-header">Longitude</div>
            <div class="admin-row-location-header">Location</div>
        </div>
        <br></br>
        <hr></hr>
        {this.state.entries}
      </div>
    )
  }
}

export default Admin
