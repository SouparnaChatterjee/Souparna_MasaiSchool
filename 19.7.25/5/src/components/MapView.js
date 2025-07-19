import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutePlanner from './RoutePlanner';
import WeatherOverlay from './WeatherOverlay';
import 'leaflet/dist/leaflet.css';

const MapView = React.memo(({ currentLocation, destination, routeCoords }) => {
  const center = useMemo(() => currentLocation || [51.505, -0.09], [currentLocation]);

  return (
    <MapContainer center={center} zoom={13} style={{ height: '90vh', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {currentLocation && (
        <Marker position={currentLocation}>
          <Popup>Your Location</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      <RoutePlanner routeCoords={routeCoords} />
      {currentLocation && <WeatherOverlay location={currentLocation} />}
    </MapContainer>
  );
});

export default MapView;
