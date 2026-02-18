import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, clearErrors } from '../actions/productAction'
import Loader from './Layout/loader'
import Product from './Product'
import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import { useAlert } from 'react-alert'
import MetaData from './Layout/MetaData'

function Allproducts() {
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [price, setPrice] = useState([1, 500])
  const [ratings, setRatings] = useState(0)
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()
  const alert = useAlert()

  const {
    loading,
    products = [],
    error,
    productsCount = 0,
    limit = 8
  } = useSelector(state => state.products)

  const count = Math.max(1, Math.ceil(productsCount / limit))

  const handleChange = (_, value) => {
    setPage(value)
    window.scrollTo(0, 0)
  }

  const priceHandler = (_, newValue) => {
    setPrice(newValue)
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getProducts(keyword, page, price, category, ratings))
  }, [dispatch, page, error, keyword, price, category, ratings, alert])

  return (
    <>
      <MetaData title='All Products' />

      {/* MAIN FLEX LAYOUT */}
      <div className="flex">

        {/* FILTER PANEL */}
        <div className="w-64 p-6">

          <h1 className="text-[1.1em] font-medium mb-2">
            Price
          </h1>

          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            min={1}
            max={500}
          />

          <div className='mt-6'>
            <h6 className='font-medium mb-2'>Categories</h6>

            {['Electronics','Cameras','Laptop','Accessories','Headphones','Food','Books','Clothes/Shoes'].map((c) => (
              <div key={c}>
                <button
                  className='text-slate-600 hover:text-rose-600'
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              </div>
            ))}
          </div>

          <fieldset className='mt-6'>
            <legend className='font-medium mb-2'>Ratings</legend>
            <Slider
              value={ratings}
              onChange={(_, val) => setRatings(val)}
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </fieldset>

        </div>

        {/* PRODUCTS PANEL */}
        <div className="flex-1 px-8 py-12">

          <h2 className="text-xl md:text-3xl font-medium text-center mb-[2em] border-b border-black w-[60%] mx-auto p-2">
            All Products
          </h2>

          {loading ? <Loader /> : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Product
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.images}
                  rating={product.rating}
                  ratings={product.ratings}
                  reviewsCount={product.numOfReviews}
                />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* PAGINATION */}
      <div className='flex justify-center m-5'>
        <Stack spacing={2}>
          <Pagination
            onChange={handleChange}
            hidePrevButton
            hideNextButton
            count={count}
            color="primary"
          />
        </Stack>
      </div>
    </>
  )
}

export default Allproducts
