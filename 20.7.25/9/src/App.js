import React, { useState, useMemo } from 'react';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';

function App() {
  const [markers, setMarkers] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);

  const defaultCenter = useMemo(() => [28.6139, 77.2090], []); // Delhi

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>🗺️ Optimized Map Application</h1>
      <SearchBar setMarkers={setMarkers} setRouteCoords={setRouteCoords} />
      <MapView center={markers[0] || defaultCenter} markers={markers} routeCoords={routeCoords} />
    </div>
  );
}

export default App;
