import React from 'react';
import { Map, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';

const GoogleMap = (props) => {
    const { destination } = props;
    if (destination.length === 0) return null;

    var bounds = new props.google.maps.LatLngBounds();

    for (var i = 0; i < destination.length; i++) {
      bounds.extend(destination[i]);
    }
    const markers = destination.map(v => {
      return <Marker name={v.value}  position={v} />
    });

    return (
      <Map google={props.google}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={'map'}
        zoom={4}
        initialCenter={destination[0]}
        bounds={bounds} >
        {markers}
        <Polyline
          path={destination}
          strokeColor="red"
          strokeOpacity={0.8}
          strokeWeight={2} />
      </Map>
    )
}
export default GoogleMap;