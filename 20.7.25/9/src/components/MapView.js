import React, { useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapView = React.memo(({ center, markers, routeCoords }) => {
  const customIcon = useMemo(() => new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [30, 30],
  }), []);

  const renderMarkers = useCallback(() =>
    markers.map((pos, i) => (
      <Marker key={i} position={pos} icon={customIcon}>
        <Popup>Marker {i + 1}</Popup>
      </Marker>
    )), [markers, customIcon]);

  return (
    <MapContainer center={center} zoom={13} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© OpenStreetMap contributors'
      />
      {renderMarkers()}
      {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
    </MapContainer>
  );
});

export default MapView;
