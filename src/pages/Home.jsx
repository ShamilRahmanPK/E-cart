import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'


const Home = () => {
  const dispatch = useDispatch()

  const {allProducts,loading,errorMsg} = useSelector(state=>state.productReducer)
  console.log(allProducts,loading,errorMsg);
  

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])


  return (
    <>
    <Header insideHome={true}/>
    <div style={{paddingTop:"100px"}} className='container px-4 mx-auto'>
        {
          loading ?
          <div className="flex justify-center item-center my-5 text-lg">
            <img width={'100px'} height={'100px'} src="https://imgs.search.brave.com/uYpkEhB3tGp5UE4xitjyHQHfPReqS2aLUtltQG-b6g0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTMuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhlbUo1ZDNZeGVt/RmhjSEJwTVhOaGFE/WnVlamd3WWpjNGMz/VnJaWEEzTkhSd2Jq/aHVjbVUzWWlabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vM29Fakk2U0lJ/SEJkUnhYSTQwL2dp/cGh5LmdpZg.gif" alt="" />
            Loading...
          </div>
          :
          <>
          <div className='grid grid-cols-4 gap-4'>
              {
                allProducts?.length>0 ?
                allProducts?.map(product=>(
                  <div key={product?.id} className='rounded border p-2 shadow'>
                    <img width={'100%'} height={"100px"} src={product?.thumbnail} alt="" />
                    <div className='text-center'>
                        <h3 className='text-xl font-bold'>{product?.title}</h3>
                        <Link to={`/${product?.id}/view`} className="bg-violet-600 p-1 rounded mt-3">View more</Link>
                    </div>
                </div>
                ))
              :
              <div className="flex justify-center items-center font-bold text-red-600 my-5 text-lg">
                Product not found!
              </div>
              }
          </div>
        </>
        }
    </div>
    </>
  )
}

export default Home