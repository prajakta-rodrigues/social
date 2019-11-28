import React from 'react'
let mapboxgl = require('mapbox-gl/dist/mapbox-gl')
import store from '../store'
import placeholder from '../../static/placeholder.png'
import { get } from '../ajax'

class MapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.getLatLong = this.getLatLong.bind(this)
    this.state = {
      position: {
        lat: 47.444,
        lng: -122.176
      },
      map: null
    }
    mapboxgl.accessToken = "pk.eyJ1IjoibWVnaGFydGgiLCJhIjoiY2szZXh6NnZpMDBmZzNic2EzZ3M5NmxraCJ9.DEgkR_QJ8kwofNnyx_PvzQ"
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition(this.getLatLong)
  }

  getFriends() {
    get('/user/friends/' + store.getState().session.user_id).then(resp => {
      resp.data.forEach(friend => {
        this.createMarker(friend.latitude, friend.longitude, friend.profile_picture, friend.name)
      })
    })
  }

  createMarker(lat, lng, dp, name) {
    console.log("lat" + lat)
    console.log("lng" + lng)
    let el = document.createElement('div')
    el.className = 'marker'
    dp = dp ? dp : placeholder
    el.style.backgroundImage = "url('" + dp + "')"
    new mapboxgl.Marker(el)
        .setLngLat({lng, lat})
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h6 className=\"popup-text\">' + name + '</h6>'))
        .addTo(this.state.map)
  }

  getLatLong(position) {
    console.log(position)
    let lat = position.coords.latitude
    let lng = position.coords.longitude
    this.setState({position: {lat, lng}})
    this.state.map.flyTo({
      center: [lng, lat],
      zoom: 14
    })

    let dp = store.getState().session.profile_picture
    let name = store.getState().session.user_name

    this.createMarker(lat, lng, dp, name)
        
  }

  componentDidMount() {
    this.state.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.position.lng, this.state.position.lat],
      zoom: 8
    })
    this.state.map.addControl(new mapboxgl.NavigationControl());
    this.state.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: false
      }),
      
    );
  }
  render() {
    if(navigator.geolocation) {       
      this.getPosition()
      this.getFriends()
      return (
        <div ref={el => this.mapContainer = el} id="map"></div>
      )
    } else {
      return (
        <div>
          <p>
            Permission to access location not granted or device
            does not have GPS.
          </p>
        </div>
      )
    }
  }
} 

export default MapComponent