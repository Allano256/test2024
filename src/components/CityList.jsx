import Spinner from "./Spinner"
import styles from './CityList.module.css'
import CityItem from "./CityItem"


function CityList({cities, isLoading}) {
    if (isLoading) return <Spinner />
    // This means that if there is no city, then give a message
    if(!cities.length) return <Message message="Add your first city by clicking on a city on the map" />
    return (
        <div >
            <ul className={styles.cityList}>
                {cities.map(city => <CityItem city={city} key={city.id} /> )}
            </ul>
            
        </div>
    )
}

export default CityList

