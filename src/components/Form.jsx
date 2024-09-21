// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL =  "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
const navigate=useNavigate();

 const [lat, lng]= useUrlPosition();
 const {createCity, isLoading} = useCities();
 
   
 const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const[emoji, setEmoji] = useState();
  const [GeocodingError, setGeocodingError] = useState("")

  // We need the data wen the component mounts so we use the useEffect hook
  

  useEffect(function (){
    // If there is no latitude or longitude dont show anything
if(!lat && lng) return;

    async function fetchCityData(){
        try {
          setIsLoadingGeocoding(true);
          // This will reset the error
          setGeocodingError("")
          const res =await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
          const data = await res.json();

          if(!data.countryCode) throw new Error('That doesnt seem to be a city, click somewhere else')

          setCityName(data.city || data.locality || "" );
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode))
        } catch(err){
          setGeocodingError(err.message)
        } finally {
          setIsLoadingGeocoding(false);
        }
    }
    fetchCityData
  },[lat, lng]);

  // This will create a new city to be addded to our fake API WHEN THE FORM IS SUBMITTED
  async function handleSubmit(e){
    e.preventDefault();
    if(!cityName|| !date) return;

    const newCity ={
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng},
    };
    await createCity(newCity);
    navigate("/app/cities")
     
  }

  // This will submit the form to the fake API
  
async function createCity(newCity){
      
  try {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/cities/$ `,{
      method:"POST",
      body:JSON.stringify(newCity),
      headers:{
        "Content/Type":"application/json",
        // Here we specify that it will be a post request and the type of data being recieved being json type, this is a way of creating a post request to an API
      },
    });
    const data = await res.json();

   
    setCities(cities=> [...cities,data])
    
  }
    
 catch {
  alert('There was an error loading data...')
} finally{
  setIsLoading(false)
}

}
  

if(isLoadingGeocoding) return <Spinner />
// Also here indicate to the user to click somewhere before the form shows
if (!lat && lng) return <Message message="start by clicking somewhere on the map..." />
  if(GeocodingError) return <Message message={GeocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit} >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="ate" onChange={date => setDate(date)} selected={date} dateFormat={'dd/MM/yyyy'} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button type="primary" >Add</button>
        <BackButton />
        
      </div>
    </form>
  );
}

export default Form;
