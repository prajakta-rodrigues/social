import React from 'react'
let mapboxgl = require('mapbox-gl/dist/mapbox-gl')

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

  getLatLong(position) {
    console.log(position)
    let lat = position.coords.latitude
    let lng = position.coords.longitude
    this.setState({position: {lat, lng}})
    let el = document.createElement('div');
    el.className = 'marker'
    //replace url with the profile photo
    el.style.backgroundImage = "url('https://scontent.xx.fbcdn.net/v/t51.2885-15/70663288_1203736696487156_3419353749570991582_n.jpg?_nc_cat=104&_nc_ohc=Xh2ya6Fjoi4AQn1uHwdkholp8uLiFGsUzb3T4vXAowP1e2Wy36uMrA8Cw&_nc_ht=scontent.xx&oh=d11d2dd3b1c2c33a985b3c507fc97e3c&oe=5E48B907')"
    this.state.map.flyTo({
      center: [lng, lat],
      zoom: 14
    })

    new mapboxgl.Marker(el)
        .setLngLat({lng, lat})
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h6 className=\"popup-text\">Me</h6>'))
        .addTo(this.state.map)
        
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