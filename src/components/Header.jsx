import { useState } from "react";
import avatar from "../assets/avatar.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import EcomContext from "../context/EcomContext";
import AuthContext from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";


function Header() {

    const [open, setOpen] = useState(false);
    const {cartItems, showAndHide, cartCount} = useContext(EcomContext)
    const [state, dispatch] = useContext(AuthContext)
    const {user} = useAuth()
    const {deleteItem} = useLocalStorage("auth-token")

    const isAuthenticated = state.accessToken !== null
 
    function logout(){
        deleteItem()
        dispatch({type: "setToken", payload: null})
        showAndHide("success", "you are now signed out")
    }

    const showHeader = (
        <div className="sticky top-0 z-[20] flex items-center justify-between py-[15px] px-5 lg:px-[30px] bg-orange-500 ">
        <div>
            <h1 className="text-[24px] lg:text-[30px] font-bold">TECHNOTRONIX</h1>
        </div>

    <nav className="hidden lg:flex items-center gap-5">
        <Link className="text-[15px] font-semibold hover:text-white " to="/">
            Home
        </Link>
        <Link className="text-[15px]  font-semibold hover:text-white" to="/products">
            products
        </Link>
        <Link className="text-[15px]  font-semibold hover:text-white" to="/login">
            Login
        </Link>
        <Link className="text-[15px]  font-semibold hover:text-white" to="/register">
            signup 
        </Link>

    </nav>

    <button onClick={() => setOpen(!open)}
    className="flex items-center justify-center w-[35px] h-[35px] lg:hidden">
        <HiMenuAlt3 className="text-3xl " />
        
    </button>
     
     <div onClick={() => setOpen(!open)}  className={`fixed lg:hidden top-0 w-full bg-black z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

     </div>

    <div className={`fixed lg:hidden left-0 top-0 w-[300px] h-screen overflow-auto z-[20] bg-white transition-all duration-200 ${open ? "translate-x-[0px]" : "translate-x-[-500px]"}`}
    
    >
    <nav className="flex flex-col items-center gap-10 pt-20">
    <a className="text-[25px] font-bold hover:text-white " href="">
            Home
        </a>
        <a className="text-[25px] font-medium hover:text-white" href="">
            products
        </a>
        <a className="text-[25px] font-medium hover:text-white relative" href="">
            <GiShoppingCart  className="text-4xl"/>
            <div className="absolute bottom-4 left-4 bg-black text-center text-white rounded-full h-6 w-6 text-[15px] pt-[1px]">
            {cartCount} 
            </div>
        </a>
        <a className="text-[25px] font-medium hover:text-white" href="">
            Login
        </a>
        <a className="text-[25px]  font-medium hover:text-white" href="">
            signup
        </a>
    </nav> 

    </div>
        
      </div>
    )

    const showAuthHeader = (
        <div className="sticky top-0 z-[20] flex items-center justify-between py-[15px] px-5 lg:px-[30px] bg-orange-500 ">
        <div>
            <h1 className="text-[24px] lg:text-[30px] font-bold">TECHNOTRONIX</h1>
        </div>

    <nav className="hidden lg:flex items-center gap-5">
        <Link className="text-[15px] font-semibold hover:text-white " to="/">
            Home
        </Link>
        <Link className="text-[15px]  font-semibold hover:text-white" to="/products">
            products
        </Link>
        <Link className="text-[15px]  font-semibold hover:text-white relative" to="/cart">
        <GiShoppingCart className="text-xl" />
            <div className="absolute bottom-2 left-2 bg-black text-center text-white rounded-full h-4 w-4 text-[10px] pt-[1px]">
               {cartCount}
            </div>
        </Link>
        <Link onClick={logout} className="text-[15px]  font-semibold hover:text-white" href="" >
        
            logout
        
        </Link>
        <div className="text-[15px] font-medium flex items-center gap-2">
            <img src={"https://technotronix-api-wi44.onrender.com/" + user?.img} alt=""  className="h-7 w-7 rounded-full"/>
            <p>Hi, {user?.firstName}!</p>
        </div>

    </nav>

    <button onClick={() => setOpen(!open)}
    className="flex items-center justify-center w-[35px] h-[35px] lg:hidden">
        <HiMenuAlt3 className="text-3xl " />
        
    </button>
     
     <div onClick={() => setOpen(!open)}  className={`fixed lg:hidden top-0 w-full bg-black z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

     </div>

    <div className={`fixed lg:hidden left-0 top-0 w-[300px] h-screen overflow-auto z-[20] bg-white transition-all duration-200 ${open ? "translate-x-[0px]" : "translate-x-[-500px]"}`}
    
    >
    <nav className="flex flex-col items-center gap-10 pt-20">
    <a className="text-[25px] font-bold hover:text-white " href=""> 
            Home
        </a>
        <a className="text-[25px] font-medium hover:text-white" href="">
            products
        </a>
        <a className="text-[25px] font-medium hover:text-white relative" href="">
            <GiShoppingCart  className="text-4xl"/>
            <div className="absolute bottom-4 left-4 bg-black text-center text-white rounded-full h-6 w-6 text-[15px] pt-[1px]">
            {cartCount} 
            </div>
        </a>
        <Link onClick={logout} className="text-[25px]  font-medium hover:text-white" href="" >
        
            logout
        
        </Link>
        <div className="text-[25px] font-medium flex items-center gap-2">
            <img src={ "https://technotronix-api-wi44.onrender.com/" + user?.img} alt=""  className="h-7 w-7 rounded-full"/> 
            <p>Hi, {user?.firstName}!</p>
        </div>
    </nav> 
     </div>
      </div>
    );

  return <div>{isAuthenticated ? showAuthHeader : showHeader}</div>
}



export default Header