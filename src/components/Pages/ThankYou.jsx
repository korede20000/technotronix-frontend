import EcomContext from "../../context/EcomContext"
import { useSearchParams } from "react-router-dom"
import { useEffect, useContext } from "react"

function ThankYou() {
  const {createOrder} = useContext(EcomContext)
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref")
  const transaction_id = searchParams.get("transaction_id")
  
  useEffect(()=>{
    if (transaction_id && tx_ref) {
      createOrder(transaction_id, tx_ref)
    }
  }, [transaction_id, tx_ref, createOrder])


  return (
    <div className="flex flex-col items-center my-[5%]">
        <img src="/img/Thanks.jpg"  className="h-[200px] w-[50%]" alt="" />
        <p className="text-2xl my-[3%]">Thank you for your purchase Korede, a representative will get back to you shortyl</p>
        <button className="bg-orange-500 text-whiet p-[10px] rounded-md hover:text-black" >Manage Orders</button>
    </div>
  )
}

export default ThankYou
