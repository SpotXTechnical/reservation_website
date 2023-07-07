// import React from "react";
// import { useGoogleMap, Marker, GoogleApiWrapper } from "google-maps-react";

// const MapContainer = (props) => {
//   const mapStyles = {
//     width: "100%",
//     height: "400px",
//   };

//   const { google, loaded } = useGoogleMap({
//     apiKey: "AIzaSyBf_LK1_yKWP7nq49NGLqpmwIIpwNS-PzI",
//   });

//   if (!loaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={mapStyles}>
//       <Marker
//         google={google}
//         position={{ lat: 31.00000000, lng: 29.00000000 }}
//       />
//     </div>
//   );
// };

// export const WrappedMapContainer = GoogleApiWrapper({
//   apiKey: "AIzaSyBf_LK1_yKWP7nq49NGLqpmwIIpwNS-PzI", 
// })(MapContainer);




import React from 'react';
import GoogleMapReact from 'google-map-react';


const MapContainer = (mapPosition) => {
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: mapPosition,
      map
    });
    return marker;
  }
  
  
    return (
      <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyBf_LK1_yKWP7nq49NGLqpmwIIpwNS-PzI",
                  }}
                  defaultCenter={mapPosition}
                  defaultZoom={8}
                  onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
                >
                </GoogleMapReact>
      </div>
    );
}

export default MapContainer;
