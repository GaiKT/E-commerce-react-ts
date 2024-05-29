import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/products";

export default function Detail() {
  const param = useParams()
  const [product,setProduct] = useState<Product>()
  const [showImage , setShowImage] = useState('')
  const [order , setOrder] = useState(1)
  console.log(product)

  const getProductId = async () => {
    try {
      const result = await axios.get('https://dummyjson.com/products/' + param.id);
      setProduct(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(()=>{
    getProductId()
  },[])

  if(product){
    return (
      <div className="min-h-screen md:p-10">
        <div className="flex justify-center m-5">
          <div className="flex flex-col w-1/2 max-sm:w-full justify-center items-center p-5 gap-5 bg-slate-100 rounded-lg">
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
        <div className="flex flex-col gap-5 justify-center items-center p-5">
          <p className="text-6xl font-bold text-center">{product.title}</p>
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg text-center md:w-1/2">
              {product.description}
            </p>
            <p className="text-4xl flex justify-center items-center gap-5">
              <span>${product?.discountPercentage ? (product.price - product.price * product?.discountPercentage / 100).toFixed(2)  :product.price }</span> 
              { product?.discountPercentage && <span className="text-lg line-through">{product.price}</span> } 
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
            <button className="flex gap-2 text-xl border rounded-lg p-4 justify-center items-center bg-green-700 text-white" disabled={order <= product.minimumOrderQuantity}>
                Buy Now!
            </button>
          </div>
          <div>
            <span>Stock : {product.stock !== 0 ? product.stock : 'Sold Out!'}</span>
            { 
              product.availabilityStatus === "Low Stock" &&
              <span className="text-red-500 ml-4">Low Stock</span>
            }
          </div>
          
          <div>
            
          </div>
        </div>
      </div>
    )
  }
}
