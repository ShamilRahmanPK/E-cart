import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'


const Home = () => {
  const dispatch = useDispatch()
  const {allProducts,loading,errorMsg} = useSelector(state=>state.productReducer)
  console.log(allProducts,loading,errorMsg);

  const [currentPage,setCurrentPage] = useState(1)
  const productPerPage = 8
  const totalPages = Math.ceil(allProducts?.length/productPerPage)
  const currentPageProductLastIndex = currentPage * productPerPage
  const currentPageProductFirstIndex = currentPageProductLastIndex - productPerPage
  const visibleAllProduct = allProducts?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)
  

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  const navigateToNextPage = ()=>{
    if (currentPage!=totalPages) {
      setCurrentPage(currentPage+1)
    }
  }

  const navigateToPrevPage = ()=>{
    if (currentPage!=1) {
      setCurrentPage(currentPage-1)
    }
  }

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
                visibleAllProduct?.map(product=>(
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
          <div className="text-2xl text-center font-bold mt-20">
            <span onClick={navigateToPrevPage} className="cursor-pointer"><i className="fa-solid fa-backward me-5"></i></span>
            <span>{currentPage} of {totalPages}</span>
            <span onClick={navigateToNextPage} className="cursor-pointer"><i className="fa-solid fa-forward me-5"></i></span>
          </div>
        </>
        }
    </div>
    </>
  )
}

export default Home