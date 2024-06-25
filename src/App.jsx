import Header from "./components/Header"
import Carousel from "./components/Carousel"
import Details from "./components/Pages/Details"
import Featured from "./components/Featured"
import Products from "./components/Pages/Products"
import Footer from "./components/Footer"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import TopSelling from "./components/TopSelling"
import { EcomProvider } from "./context/EcomContext"
import Cart from "./components/Pages/Cart"
import { products } from "./Data/EcomData"
import Checkout from "./components/Pages/Checkout"
import Alert from "./components/Alert"
import Register from "./components/Pages/Register"
import Login from "./components/Pages/Login"
import ThankYou from "./components/Pages/ThankYou"
import { AuthProvider } from "./context/AuthContext"
import useLocalStorage from "./hooks/useLocalStorage"

function App() {
  const {getItem} = useLocalStorage("auth-token")
  const token = getItem()
  let authInitialState = {accessToken: token ?? null}

  return (
    <AuthProvider defaultState={authInitialState} >
      <EcomProvider>
      <Router>
      <Header /> 
      <Alert/>
      <Routes>
        <Route path="/" element={
          <>
          <Carousel />
          <Featured />
          <TopSelling />
          </>
        } /> 
            
        <Route path="/products" element={<Products/>} 
        />
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/thankyou" element={<ThankYou/>} />
      </Routes>
      <Footer />
    </Router> 
    </EcomProvider>
    </AuthProvider>
  )
}

export default App
