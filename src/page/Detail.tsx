import { useParams} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/products";
import { useDispatch} from "react-redux";
import { addProduct } from "../utils/productSlice";
import Navbar from "../component/navbar";
import { Rating } from "@mui/material";
import Alert from '@mui/material/Alert';

export default function Detail() {
  const param = useParams()
  const [product,setProduct] = useState<Product>()
  const [showImage , setShowImage] = useState('')
  const [order , setOrder] = useState(1)
  const dispatch = useDispatch()
  const [alertIsShow , setAlertIsShow] = useState(false)

  const getProductId = async () => {
    try {
      const result = await axios.get('https://dummyjson.com/products/' + param.id);
      setProduct(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product:Product) => {
    dispatch(addProduct({...product , quantity : order}))
    setAlertIsShow(!alertIsShow)
  }


  useEffect(()=>{
    getProductId()
  },[])

  if(product){
    return (
      <div className="min-h-screen relative">
        <Navbar/>
        <div className="flex justify-center m-5 md:p-10">
          <div className="flex flex-col w-1/2 max-sm:w-full justify-center items-center p-5 gap-5 bg-white rounded-md">
              <div className="h-80">
                <img src={showImage ? showImage : product.images[0]} alt={product.title + " image"} className="w-80" />
              </div>
              <div className="w-full flex border gap-2 bg-white">
                {
                  product.images?.map((img:string , index:number)=>{ 
                    return <img key={index} src={img} alt={ product.title + " image"} onClick={()=>{setShowImage(img)}} className="bg-slate-600 rounded-md cursor-pointer w-12" />
                  })
                } 
              </div>
          </div>  
        </div>
        <div className="flex flex-col gap-5 justify-center items-center p-5 md:p-10 bg-white rounded-t-md">
          <p className="text-6xl font-bold text-center">{product.title}</p>
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg text-center md:w-1/2">
              {product.description}
            </p>
            <div className="text-xs md:w-1/2 p-2 border rounded-md grid grid-cols-2 my-4 opacity-50 gap-2 w-full">
              <p>brand : {product.brand}</p>
              <p>category : {product.category}</p>
              <p>return : {product.returnPolicy}</p>  
              <p>warranty : {product.warrantyInformation}</p>  
              <p>shipping : {product.shippingInformation}</p>  
              <p>sku : {product.sku}</p> 
              <p>weight : {product.weight} </p>
              <p>dimensions : {product.dimensions.width}*{product.dimensions.height}*{product.dimensions.depth}</p>
            </div>
            <p className="text-4xl flex justify-center items-center gap-5 my-4">
              <span>${product?.discountPercentage ? (product.price - product.price * product?.discountPercentage / 100).toFixed(2)  :product.price }</span> 
              { product?.discountPercentage && <span className="text-lg line-through text-red-400">{product.price}</span> } 
            </p>
          </div>
          <div className="flex gap-5 font-bold">
            <div className="flex gap-2 text-xl border rounded-lg p-4">
                <button 
                className="p-2"
                onClick={()=>{
                  if(order < product.stock){setOrder(order + 1)} 
                }}
                >+</button>
                <p className="p-2">{order}</p>
                <button 
                className="p-2"
                onClick={()=>{
                  if(order > 1){setOrder(order - 1)}
                }}
                >-</button>
            </div>
            <button className="flex gap-2 text-xl border rounded-lg p-4 justify-center items-center bg-green-700 text-white" 
            onClick={()=>{addToCart(product)}}
            >
                Add To Cart
            </button>
          </div>
          <div>
            <span>Stock : {product.stock !== 0 ? product.stock : 'Sold Out!'}</span>
            { 
              product.availabilityStatus === "Low Stock" &&
              <span className="text-red-500 ml-4">Low Stock</span>
            }
          </div>
          <hr />
          <div className="mt-4">
            <p className="text-2xl">Rating <span className="text-2xl font-bold">{product.rating}</span>/5</p>
            <Rating value={product.rating} readOnly />
          </div>
          <div className="p-2 md:grid md:grid-cols-4 w-full md:gap-4">
            {
              product.reviews.map((review , index)=>{
                return (
                  <div key={index} className="my-2 border rounded-md p-4">
                    review by <span className="font-bold">{review.reviewerName}</span>
                    <div>
                      <Rating value={review.rating} readOnly />
                      <p>{review.comment}</p> 
                      <p className="text-xs opacity-50">date: {review.date.split('T')[0]}</p>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        {
          alertIsShow &&
            <Alert  
            sx={{
              position: 'sticky',
              bottom : 0,
              zIndex : 10
            }}
            severity="success" onClose={() => setAlertIsShow(!alertIsShow)}>
              This product added in your cart.
            </Alert>
        }
      </div>
    )
  }
}
