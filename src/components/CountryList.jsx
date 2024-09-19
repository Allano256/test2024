import Spinner from "./Spinner"
import styles from './CountryList.module.css'
import CountryItem from "./CountryItem"
import Message from "./Message"


function CountryList({cities, isLoading}) {
    if (isLoading) return <Spinner />
    // This means that if there is no city, then give a message
    if(!cities.length) 
        return <Message message="Add your first country by clicking on a city on the map" />

//   Use the reduce method inorder to have a unique city for each iteration and acc-accumulator/arr,cur/city-current value
  const countries=cities.reduce((arr,city)=> {
    if(!arr.map((el)=> el.country).includes(city.country))
        return [...arr, {country: city.country, emoji:city.emoji}];
    else return arr;
  }, []);

  return (
    <ul className={styles.CountryList} >
        {countries.map((country)=> (
            <CountryItem country={country} />
        ))}
        
    </ul>
  );

}

export default CountryList;
