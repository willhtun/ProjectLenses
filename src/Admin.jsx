import './Admin.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../configuration/prod.json';
import serialize from 'form-serialize';
import { useAuth } from "./AuthProvider";

function Admin(props) {
  const [entries, setEntries] = useState([]);
  const { getUserPassword } = useAuth();

  const fetchPhotos = () => {
    axios.get(config.lensesBackendUrl + "/v1/photos")
      .then(response => {
        setEntry(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const setEntry = (data) => {
    let tempEntries = []
    data.sort(function(a, b) {return a['sort_key'] - b['sort_key']});
    for (let i = 0; i < data.length; i++) {
      tempEntries.push(
        <div>
          <form class="admin-row-container" onSubmit={updateEntry}>
            <textarea readOnly class="admin-row-id" name="id" value={data[i]["id"]}></textarea>
            <textarea class="admin-row-sort" name="sort_key" defaultValue={data[i]["sort_key"]}></textarea>
            <div class="admin-row-thumbnail" style={{ backgroundImage:"url(" + data[i]["s3_thumbnail_url"] + ")" }}></div>
            <textarea class="admin-row-title" name="title" defaultValue={data[i]["title"]}></textarea>
            <textarea class="admin-row-date" name="date" defaultValue={data[i]["date"]}></textarea>
            <textarea class="admin-row-description" name="description" defaultValue={data[i]["description"]}></textarea>
            <textarea class="admin-row-latitude" name="latitude" defaultValue={data[i]["location"]["latitude"]}></textarea>
            <textarea class="admin-row-longitude" name="longitude" defaultValue={data[i]["location"]["longitude"]}></textarea>
            <textarea class="admin-row-location" name="location" defaultValue={data[i]["location"]["name"]}></textarea>
            <input class="admin-row-isPoem" type="checkbox" name="is_poem" defaultChecked={data[i]["is_poem"]}></input>
            <input type="submit" value="Update"/>
          </form>
          <hr></hr>
        </div>
      )
    }
    setEntries(tempEntries)
  }

  const updateEntry = (event) => {
    event.preventDefault()
    let formData = serialize(event.target, { hash: true });
    let isPoemChecked = formData["is_poem"]? true: false; // Needed for unchecked, formData will not have field is_poem
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
      },
      "is_poem": isPoemChecked
    }
    axios.put(config.lensesBackendUrl + "/v1/photos/" + formData["id"], payload, {
      headers: {
        'Authorization': getUserPassword()
      }
    })
    .then(response => {
      alert(response.data);
    })
    .catch(error => {
      alert("Update failed: " + error.message);
    });
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

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
        <div class="admin-row-isPoem-header">Is Poem?</div>
      </div>
      <br></br>
      <hr></hr>
      {entries}
    </div>
  )
}

export default Admin
