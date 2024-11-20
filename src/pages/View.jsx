import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWhishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {
  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const userWhishlist = useSelector(state=>state.wishlistReduer)
  const [products,setProducts] = useState({})
  const {id} = useParams()
  // console.log(id);
  // console.log(products);
  

  useEffect(()=>{
    if (sessionStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProducts(allProducts.find(items=>items.id==id))
    }
  },[])

  const handleWhishlist = ()=>{
    const existingProduct = userWhishlist?.find(item=>item?.id==id)
    if (existingProduct) {
      alert("Product already in your wishlist!!")
    } else {
      alert("Product added to your wishlist")
      dispatch(addToWhishlist(products))
    }
  }

  const handleCart = ()=>{
    dispatch(addToCart(products))
    const existingProduct = userCart?.find(item=>item?.id==id)
    if (existingProduct) {
      alert("Product quantity is incremending in your cart!")
    } else {
      alert("Product added to your cart")
    }
  }
  

  return (
    <>
    <Header/>
    <div className='flex flex-col mx-5' >
        <div className="grid grid-cols-2 items-center h-screen">
          <div>
          <img className='ms-30' width={'350px'} height={'250px'} src={products?.thumbnail} alt="" />
          <div className="flex justify-between m-5">
              <button onClick={handleWhishlist} className="bg-blue-600 rounded text-white p-2">ADD TO WISHLIST</button>
              <button onClick={handleCart} className="bg-green-600 rounded text-white p-2">ADD TO Cart</button>
            </div>
          </div>
          <div>
            <h3 className="font-bold">PID : {products?.id}</h3>
            <h1 className="text-5xl font-bold">{products?.title}</h1>
            <h4 className="font-bold text-red-600 text-2xl">$ {products?.price}</h4>
            <h4>Brands : {products?.brand}</h4>
            <p>
              <span className="font-bold">Description</span>: {products?.description}
            </p>
            <h3 className="font-bold mt-4">Client Reviews</h3>
            {
              products?.reviews?.length>0?
              products?.reviews?.map(item=>(
                <div key={item?.id} className="shadow border rounded p-2 mb-2">
                  <h5>
                    <span className="font-bold">{item?.reviewerName}</span> : <span>{item?.comment}</span>
                  </h5>
                  <p>Rating : {item?.rating} <i className="fa-solid fa-star text-yellow-400"></i> </p> 
                </div>
              ))
              :
              <div className="font-bold text-red-600">No Reviews yet!!</div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default View