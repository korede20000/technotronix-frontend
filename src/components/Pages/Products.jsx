import Card from "../shared/Card"
import { useContext } from "react"
import EcomContext from "../../context/EcomContext"
import { Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Products() {
    const {product, addToCart} = useContext(EcomContext)
    const [state, dispatch] = useContext(AuthContext)
    const isAuthenticated = state.accessToken !== null
    const redirect = useNavigate()

    const login = ()=>{
        if (!isAuthenticated){
            redirect("/login")
        }
    }    


  return (
    <div>
       <div className="my-[20px] mx-[30px]">
        <h1 className="mb-[10px] text-orange-500 font-bold text-2xl">All Products</h1>
        <div className="flex gap-12 flex-wrap">
            {product.map((item)=>(
                <Card key={item._id}>
                    <Link to={`/details/${item._id}`}><img src={ "http://localhost:5000/" + item.img} alt="" className="h-[200px]" /></Link>
                    <p className="font-bold">{item.name}</p>
                    <p>{item.price}</p>
                    <button onClick={isAuthenticated ? ()=> addToCart(item._id) : login}  className="bg-orange-500 text-white p-[10px] rounded mt-[10px]">
                        Add to cart
                    </button>
                </Card>
            ))}
        </div> 
    </div>
    </div>
  )
}

export default Products