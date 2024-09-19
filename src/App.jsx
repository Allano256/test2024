
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayOut from "./pages/AppLayOut";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/CountryList";

const BASE_URL="http://localhost:9000"

function App() {

  const[cities, setCities]=useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  // Load ata on mount using useEffect
  useEffect(function () {
    async function fetchCities(){
      try {
        const res = await fetch(`${BASE_URL}/cities `)
        const data = await res.json();
        setCities(data);
      }
        
     catch {
      alert('There was an error loading data...')
    } finally{
      setIsLoading(false)
    }

  }
  fetchCities();

  }, []);

  
  return (

    
    <BrowserRouter>
              <Routes>
              <Route  element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayOut />}> 
              {/* Having the index helps direct to homepage or default if nothing shows  */}
                 <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
                 <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                 {/* Creating the params/parameter */}
                 <Route path="cities/:id" element={<City />} />
                 <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                 <Route path="form" element={<p>Form</p>} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            
            </Routes>
   
           </BrowserRouter>
         
  )  
}

export default App
