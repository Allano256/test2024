
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayOut from "./pages/AppLayOut";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/CountryList";
import Form from "./components/CountryList";
import { CitiesProvider } from "./contexts/CitiesContext";



function App() {

 
  
  return (
      <CitiesProvider>
    
    <BrowserRouter>
              <Routes>
              <Route  element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayOut />}> 
              {/* Having the index helps direct to homepage or default if nothing shows  */}
              {/* Use the replace keyword to go back to where we were before*/}
                 <Route index element={<Navigate replace to={'cities'} />} />
                 <Route path="cities" element={<CityList  />} />
                 {/* Creating the params/parameter */}
                 <Route path="cities/:id" element={<City />} />
                 <Route path="countries" element={<CountryList  />} />
                 <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            
            </Routes>
   
           </BrowserRouter>
           </CitiesProvider>
         
  )  
}

export default App
