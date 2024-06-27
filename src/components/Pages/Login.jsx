import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import EcomContext from "../../context/EcomContext"
import useLocalStorage from "../../hooks/useLocalStorage"
import loginBackground from "/img/login background.jpg"

function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [state, dispatch] = useContext(AuthContext)
  const {showAndHide} = useContext(EcomContext)
  const {setItem} = useLocalStorage("auth-token")

  const redirect = useNavigate()

  const loginHandler = async(e)=> {
    e.preventDefault();
    try {
      const res = await fetch("https://technotronix-api-wi44.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      const data = await res.json()

      if (data === "Invalid Email/Password") {
        showAndHide("error", "Invalid Email/Password")
      }else {
        dispatch({type: "setToken", payload: data.token})
        setItem(data.token)
        redirect("/")
        showAndHide("success", "Login Successful!!!")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
  <div>
      <div className="bg-cover">

    <div className="w-[85%] lg:w-[30%] mx-auto my-[5%] outline outline-1 rounded-md px-[2%] py-[2%]">
      
      <h1 className='text-center mb-5 font-bold text-3xl'>Login</h1>
     <form onSubmit={loginHandler}>
          <div className="flex flex-col gap-3 mb-3">
              <label htmlFor="email" className="font-bold">Email</label>
              <input type="email"  className="outline outline-1" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col gap-3 mb-3 ">
              <label htmlFor="password" className="font-bold">Password</label>
              <input type="password" className="outline outline-1" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="outline outline-1 bg-black  w-[20%] text-center mx-auto mt-8 rounded-md">
              <button className="font-semibold text-white ">Submit</button>
          </div>
          
      </form> 
  </div>
      </div>
    </div>
  )
}

export default Login