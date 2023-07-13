import React from "react";
import GoogleMapReact from "google-map-react";

const MapContainer = ({ mapPosition }) => {
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: mapPosition,
      map,
    });
    return marker;
  };

  const handleMapClick = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${mapPosition.lat},${mapPosition.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBf_LK1_yKWP7nq49NGLqpmwIIpwNS-PzI",
        }}
        defaultCenter={mapPosition}
        defaultZoom={8}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        onClick={handleMapClick}
      ></GoogleMapReact>
    </div>
  );
};

export default MapContainer;
