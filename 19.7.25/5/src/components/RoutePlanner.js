import React from 'react';
import { Polyline } from 'react-leaflet';

const RoutePlanner = React.memo(({ routeCoords }) => {
  if (!routeCoords || routeCoords.length === 0) return null;
  return <Polyline positions={routeCoords} color="blue" />;
});

export default RoutePlanner;
