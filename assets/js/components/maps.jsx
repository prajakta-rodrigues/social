import React from 'react'
import {Polygon, Map, GoogleApiWrapper, Marker} from 'google-maps-react'


class MapComponent extends React.Component {
    constructor(props) {
        super(props)
        this.getLatLong = this.getLatLong.bind(this)
        this.state = {
            position: {
                lat: 47.444,
                lng: -122.176
            }
        }
    }

    getPosition() {
        navigator.geolocation.getCurrentPosition(this.getLatLong)
    }

    getLatLong(position) {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        this.setState({position: {lat, lng}})
    }

    createPolygon(lat, lng) {
        let color = 'rgb(' + Math.random()*255 +',' + Math.random()*255 + ',' + Math.random()*255 + ')'
        return (
            <Polygon
                paths={
                    [
                        {lat: lat + 0.01, lng: lng - 0.01},
                        {lat: lat + 0.01, lng: lng + 0.01},
                        {lat: lat - 0.01, lng: lng + 0.01},
                        {lat: lat - 0.01, lng: lng - 0.01},
                    ]
                }
                strokeColor={color}
                fillColor={color}
                strokeOpacity={0.9}
                strokeWeight={3}
                fillOpacity={0.6}
            />
        )
    }
    render() {
        if(navigator.geolocation) {           
            this.getPosition()
            return (
                <div id="map">
                    <Map 
                        google={this.props.google}
                        zoom={14}
                        center={this.state.position}
                    >
                        <Marker
                            position={this.state.position}
                        />
                        {this.createPolygon(this.state.position.lat, this.state.position.lng)}
                        {this.createPolygon(this.state.position.lat + 0.02, this.state.position.lng)}
                        {this.createPolygon(this.state.position.lat - 0.02, this.state.position.lng)}
                        {this.createPolygon(this.state.position.lat, this.state.position.lng + 0.02)}
                        {this.createPolygon(this.state.position.lat, this.state.position.lng - 0.02)}
                    </Map>
                </div>
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

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_API_KEY
})(MapComponent)