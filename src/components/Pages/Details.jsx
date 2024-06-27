import { useParams } from "react-router-dom"
import { useContext } from "react"
import EcomContext from "../../context/EcomContext"
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Details() {
    const params = useParams()
    const carid = params.id
    const {product, addToCart} = useContext(EcomContext)
    const caritem = product.find((item)=> item._id === carid)
    console.log(caritem)
    const [state, dispatch] = useContext(AuthContext)
    const isAuthenticated = state.accessToken !== null

    
    const redirect = useNavigate()

    const login = ()=>{
        if (!isAuthenticated){
            redirect("/login")
        }
    }    

  return (
    <div className='lg:flex m-[5%] gap-4'>
      <div className='w-[50%]'>
        <img src={"https://technotronix-api-wi44.onrender.com/" + caritem?.img} alt="" />
      </div>
      <div className='w-[50%]'>
        <h1 className='text 2-xl font-bold border-b-2 mb-5'> {caritem?.name}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim at excepturi fugit quae veritatis sit aperiam, quod autem fuga dignissimos provident maiores? Voluptates quod hic minus quas enim? Ea, accusamus!</p>
        <p className='text-xl font-bold mb-5 mt-5'>{caritem?.price}</p>
        {/* <p className="mt-5 font-bold">Category: <span></span></p> */}
        <button onClick={isAuthenticated ? ()=> addToCart(caritem._id) : login} className="bg-orange-500 text-white p-[10px] rounded mt-[10px]">
          Add to cart
         </button>
      </div>
    </div>
  )
}

export default Details