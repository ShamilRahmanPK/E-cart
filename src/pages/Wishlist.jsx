import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/slices/wishlistSlice'


const Wishlist = () => {
    const dispatch = useDispatch()
    const userWishlist = useSelector(state=>state.wishlistReducer)
  return (
    <>
    <Header/>
        <div style={{paddingTop:"100px"}}>
        {
            userWishlist?.length>0 ?
            <>
            <h1 className='text-4xl font-bold text-red-600'>My Whishlist</h1>
            <div className='grid grid-cols-4 gap-4 mt-5'>
            {
                userWishlist?.map(product=>(
                    <div key={product?.id} className='rounded border p-2 shadow'>
                <img width={'100%'} height={"100px"} src={product?.thumbnail} alt="" />
                <div className='text-center'>
                    <h3 className='text-xl font-bold'>{product?.title}</h3>
                    <div className="text-center">
                        <button onClick={()=>dispatch(removeItem(product?.id))} className="text-xl"><i className="fa-solid fa-heart-circle-xmark text-red-600"></i></button>
                        <button className="text-xl"><i className="fa-solid fa-cart-plus text-green-600"></i></button>
                    </div>
                </div>
            </div>
                ))
            }
        </div>
        </>
        :
        <div className="flex flex-col justify-center item-center">
            <img src="https://silkbooth.com/media/wysiwyg/test/Cart_empty_page.gif" alt="" style={{height:"500px",width:'50%',marginLeft:'300px'}} />
            <h1 className="text-4xl text-red-600 mt-3">Your Wishlist is Empty!!</h1>
        </div>
        }
        </div>
    </>
  )
}

export default Wishlist