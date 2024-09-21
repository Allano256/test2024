import { Link } from "react-router-dom";
import styles from "./CityItem.module.css"


const BASE_URL="http://localhost:9000"

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  

function CityItem({city}) {
    const {cityName, emoji, date, id, position} =city;
    const {currentCity, deleteCity} = useCities()

    function handleClick(e){
        e.preventDefault();
        deleteCity(id)
        
    }

    
async function deleteCity(id){
      
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id} `,{
        method:"DELETE",
       
      });
     
      setCities((cities)=> cities.filter((city)=> city.id !== id));
    }
      
   catch {
    alert('There was an error deleting city...')
  } finally{
    setIsLoading(false)
  }
 
  }

  

    return (
        <div>
            <li>
                <Link className= {`${styles.CityItem} ${id===currentCity.id? styles['CityItem--active'] : ''}`}    to={ `${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
              <h3 className={styles.name}>{cityName}</h3>
              <time className={styles.date}> ({formatDate(date)})</time>
              <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
              </Link>
              
            </li>
            
        </div>
    )
}

export default CityItem
