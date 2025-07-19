import React, { useState, useCallback } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useFetchRoute from './hooks/useFetchRoute';
import SearchBox from './components/SearchBox';
import MapView from './components/MapView';

function App() {
  const currentLocation = useGeolocation();
  const [destination, setDestination] = useState(null);
  const routeCoords = useFetchRoute(currentLocation, destination);

  const handleSearch = useCallback(loc => setDestination(loc), []);

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <MapView
        currentLocation={currentLocation}
        destination={destination}
        routeCoords={routeCoords}
      />
    </div>
  );
}

export default App;
