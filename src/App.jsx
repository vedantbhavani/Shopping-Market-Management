import React, { useEffect, useState } from 'react'
import "./App.css"

const App = () => {
  const [products, setproducts] = useState()
  const [min , setmin] = useState(0)
  const [max , setmax] = useState(0)
  const [rating , setrating] = useState(0)

  useEffect(() => {
    const datafunc = async () => {
      const apiData = await fetch('https://dummyjson.com/products')
      const data = await apiData.json()
      setproducts(data.products)
    }
    datafunc()
  }, [])
  
  useEffect(() => {
    const datafunc = async () => {
      const apiData = await fetch('https://dummyjson.com/products')
      const data = await apiData.json()
      const maindata = data.products
      const filtermindata = maindata.filter((data) => {
        if(max == 0){  
          return min <= data.price
        }
      })    
      setproducts(filtermindata)
    }
    
    datafunc()
  }, [min])
  
  useEffect(()=> {
    const datafunc = async() => {
      const apiData = await fetch('https://dummyjson.com/products')
      const data = await apiData.json()
      const maindata = data.products;
      const filterminmax = maindata.filter((data) => {
        return  min <= data.price && max >= data.price
      })
      setproducts(filterminmax)
    }
      datafunc()

  },[min , max])


  useEffect(()=> {
    const datafunc = async() => {
      const apiData = await fetch('https://dummyjson.com/products')
      const data = await apiData.json()
      const maindata = data.products;
      const filterrating = maindata.filter((data) => {
        if(min == 0 && max == 0)
        return rating <= data.rating 
      })
      setproducts(filterrating)
    }
      datafunc()
  },[rating])
  
  useEffect(()=> {
    const datafunc = async() => {
      const apiData = await fetch('https://dummyjson.com/products')
      const data = await apiData.json()
      const maindata = data.products;
      const filterrating = maindata.filter((data) => {
        if(min !== 0 && max !== 0 && rating !== "0"){
          return min <= data.price && max >= data.price && rating <= data.rating
        }
      })
      setproducts(filterrating)
    }
      datafunc()
  },[rating , min , max])

  return (
  <>
  <div className="conditions">
    <div>
    <h2>Min Price</h2>
    <input type="number" name="min" id="min" value={min} onChange={(e)=> setmin(e.target.value)}/>
    </div>
    <div>
    <h2>Max Price</h2>
    <input type="number" name="min" id="min" value={max} onChange={(e) => setmax(e.target.value)}/>
    </div>
    <div>
    <h2>Minimum Ratting</h2>
    <select name="rating" id="rating" value={rating} onChange={(e)=> setrating(e.target.value)}>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    </div>

  </div>
    <div className='box-container'>
      {
        products?.map((data) => {
          return (
            <div key={data.id} className='boxes'>
              <div>
              <img className='box-image' src={data.images} alt="" />  
              </div>
              <div className="names">
                <p>Name: {data.title}</p>
                <p>Price: <span className="access">₹{data.price}</span></p>
                <p>Rating: <span className="access">{data.rating}</span></p>
                <p>Stock: {data.stock}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  </>
  )
}

export default App
