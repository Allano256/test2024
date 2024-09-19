import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './map.module.css'

function Map() {
        // We use the useNavigate hook so that the person can move from the map to the form when they click a position on the map

        const navigate =useNavigate();


    const [searchParams, setSearchParams]=useSearchParams();
    const lat = searchParams.get("lat")
    const lng=searchParams.get("lng")
    return (
            <div  className={styles.mapContainer} onClick={()=> {navigate("form")}} >
          <h1>Map</h1>
          <h1>Position: {lat}, {lng} </h1>
          <button onClick={()=> {
            setSearchParams({lat:23, lng:50})
          }} >Change Pos </button>
        </div>
    )
}

export default Map
