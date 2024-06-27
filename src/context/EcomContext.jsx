import { createContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";

const EcomContext = createContext()

export const EcomProvider = ({ children }) => {
  const [product, setProduct] = useState([])
  const [slide, setSlide] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [order, setOrder] = useState([null])
  const [cartCount, setCartCount] = useState(0)
  const { showAndHide, alertInfo } = useAlert();

  useEffect(() => {
    fetchProduct()    
    fetchCarousel()
    fetchCart()
  }, [])

  useEffect(() => {
    const count = cartItems.products?.reduce((total, item) => total + item.quantity, 0)

    setCartCount(count)
  }, [cartItems])


  const featured = product.filter((item => item.featured === true));
  const topSelling = product.filter((item => item.topSelling === true));

  const fetchProduct = async () => {
    const response = await fetch("http://localhost:5000/api/product")
    const data = await response.json()
    setProduct(data)
  }

  const fetchCarousel = async () => {
    const response = await fetch("http://localhost:5000/")
    const data = await response.json()
    setSlide(data)
  }

  // const addToCart = (prod) => {
  //   const existingItemIndex = cartItems.findIndex((item) => item.id === prod.id);
  //   if (existingItemIndex !== -1) {
  //     const updatedCartItem = [...cartItems];
  //     const itemToUpdate = updatedCartItem[existingItemIndex]
  //     itemToUpdate.quantity += prod.quantity;
  //     itemToUpdate.amount = itemToUpdate.price * itemToUpdate.quantity
  //     showAndHide("error", "Item already exist in cart")
  //   } else {
  //     setCartItems([...cartItems, { ...prod, amount: prod.price * prod.quantity }]);
  //     showAndHide("success", "Item added to cart")
  //   }
  // };


  const addToCart = async (productId) =>{
    try {
      const res = await fetch("http://localhost:5000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({productId, quantity: 1}),
      });

      if (!res.ok) {
        throw new Error("Something Went Wrong")
      }

      const data = await res.json()
      setCartItems(data);
      showAndHide("Success", "item added to cart")
    } catch (error) {
      console.log(error.message);
      showAndHide("error", "Failed to add item to cart")
    }
  }

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong")
      }
        
      const data = await res.json();
      setCartItems(data)
    } catch (error) {
      console.error("Error getting cart", error);
    }
  } 

  const updateQuantity = async (productId, quantity) => {
    if (!quantity > 0) {
      showAndHide("error", "quantity cannot be less than 1")
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/update-quantity", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", "auth-token": `${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify({ productId, quantity}),
    });

    const data = await res.json();
    if (res.ok) {
      const existingItemIndex = cartItems.products?.findIndex((item) => item.product._id === productId);
      const updatedCartItem = [...cartItems.products ];
      const itemToUpdate = updatedCartItem[existingItemIndex];
      itemToUpdate.quantity = quantity;
      itemToUpdate.amount = itemToUpdate.product.price * itemToUpdate.quantity;
      setCartItems({...cartItems, products: updatedCartItem});
      console.log(data);
    } else {
    console.error(data.msg || "Failed to update quantity")
    }
    } catch (error) {
      console.error(error);
    }
    
  };

  const deleteItems = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/remove-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({productId})
      })

      const data = await res.json()
      if (res.ok) {
        showAndHide("success", "item removed from cart")
        setCartItems(data)
      }else {
        console.error(data.msg || "Failed to remove item")
      }
    } catch (error) {
      console.error(error);
    }
    // const updatedCartItem = cartItems.filter((item) => item.id !== id)
    // setCartItems(updatedCartItem)
    // showAndHide("error", "Item deleted from cart")
  }

  const totalAmount = () => {
    return cartItems.products?.reduce((total, item) => total + item.amount, 0);
  };

  // const handleCheckout = async() =>{
  //   const amount = totalAmount()
  //   const currency = "NGN"

  //   try {
  //     const res = await fetch("http://localhost:5000/api/payment/initiate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //       },
  //       body: JSON.stringify({amount, currency})
  //   })

  //   const data = await res.json()
  //   if (res.ok) {
  //     window.location.href = data.link
  //   } else {
  //     console.error(data.msg || "Failed to Initiate Payment");
  //   }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const createOrder = async(transaction_id, orderId)=>{
    try {
      const response = await fetch("https://technotronix-api-wi44.onrender.com/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({transaction_id, orderId}),
        credentials: "include"
    })

    const data = await response.json()
    console.log(data);
    if (res.ok) {
     setOrder(data.order)
     setCartItems([])
    } else {
      console.error(data.msg);
    }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <EcomContext.Provider value={{ featured, topSelling, product, slide, addToCart, cartItems, updateQuantity, deleteItems, totalAmount, alertInfo, showAndHide, cartCount, createOrder}}>
      {children}
    </EcomContext.Provider>
  )
};

export default EcomContext
