import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useGeolocation } from '../Hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../Hooks/useUrlPosition';

function Map() {
        // We use the useNavigate hook so that the person can move from the map to the form when they click a position on the map

   
    const [mapPosition, setMapPosition]= useState([40, 0]);
    const{cities} =useCities(); 
     const {isLoading: isLoadingPosition, position:geolocationPosition, getPosition}=useGeolocation();
    
     const [mapLat, mapLng]= useUrlPosition();
   

// This wil help our application to remember the last position even after exiting the list
useEffect(
  function(){
    if(mapLat && mapLng)setMapPosition([mapLat, mapLng]);
  },
  [mapLat, mapLng]
);

// This will enable the map move to that new position

useEffect(function() {
  if(geolocationPosition)
    setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
},[geolocationPosition])

    // We get this code from leaflet documentation

    return (
            <div  className={styles.mapContainer}  >
           { !geolocationPosition && (
            <Button type="position" onClick={getPosition} >
           {isLoadingPosition? "Loading...": "Use your position"}  </Button>)}   
         <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}  >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />
  {cities.map((city)=> (
    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
    <Popup>
      <span>{city.emoji}</span> <span>{city.sityName}</span>
    </Popup>
  </Marker>

  ))}

  <ChangeCenter position={mapPosition} />
  <DetectClick />
  
</MapContainer>
        </div>
    )
}

// Create a component to change position when we move from one city to another
function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null;
}

// Create another custom component to open the form when we click on the map
function DetectClick(){
  const navigate =useNavigate();
  useMapEvents({
    click: (e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)},
  );
}

export default Map
