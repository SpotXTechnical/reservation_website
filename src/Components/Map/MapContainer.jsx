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
    window.open(url, "_blank");
  };

  return (
    <div className="tw-h-[400px] tw-w-full tw-rounded-lg tw-overflow-hidden tw-relative">
      {/* Map overlay to prevent scroll issues */}
      <div
        className="tw-absolute tw-inset-0 tw-bg-transparent tw-z-[5]"
        onClick={handleMapClick}
        onMouseOver={(e) => (e.currentTarget.style.pointerEvents = "none")}
        onMouseOut={(e) => (e.currentTarget.style.pointerEvents = "auto")}
      />

      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBf_LK1_yKWP7nq49NGLqpmwIIpwNS-PzI",
        }}
        defaultCenter={mapPosition}
        defaultZoom={8}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        onClick={handleMapClick}
        options={{
          fullscreenControl: false,
          zoomControl: true,
        }}
      />
    </div>
  );
};

export default MapContainer;
