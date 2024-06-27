import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import EcomContext from "../../context/EcomContext"


function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");  
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {showAndHide} = useContext(EcomContext)

    const redirect = useNavigate()

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("https://technotronix-api-wi44.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    confirmPassword
                }),
            });

            const data = await res.json();
            if(data === 'exist') {
                showAndHide("error", "User Already Exist")
            }else if (data === "ïnvalid Password") {
                showAndHide(
                    "error",  "password must be 8 characters long and must contain one number and one letter"
                );
            }else if (data === "no match") {
                showAndHide("error", "password do not match");
            }else {
                redirect("/login")
                showAndHide("success", "Registration successful!!!");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

  return (
    <div className='w-[50%] mx-auto my-[5%]'>
        <h1 className='text-center mb-5 font-bold text-2xl'>Register here</h1>
        <form onSubmit={registerHandler}>
            <div className="flex flex-col gap-3 mb-3">
                <label htmlFor="FirstName">FirstName</label>
                <input type="text"  className="outline outline-1" onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-3 mb-3">
                <label htmlFor="LastName">LastName</label>
                <input type="text" className="outline outline-1" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3 mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" className="outline outline-1" onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3 mb-3">
                <label htmlFor="email">email</label>
                <input type="email" className="outline outline-1" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3 mb-3">
                <label htmlFor="">Password</label>
                <input type="password" className="outline outline-1" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3 mb-3">
                <label htmlFor="">Confirm Password</label>
                <input type="password" className="outline outline-1" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div>
                <button className="bg-black text-white p-[10px] rounded-md hover:bg-orange-500">
                    Sign Up
                </button>
            </div>
        </form>
    </div>
  )
}

export default Register