import {useSelector} from "react-redux";
import Navbar from "../component/navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/products";

export default function Summary() {
  const productset = useSelector((state:any)=> state.product.value)
  const [totalPrice , setTotalPrice] = useState(0)
  const [discount , setDiscount] = useState(0)

  const calculateRealPrice = (products: Product[]) => {
    let result = products.reduce((accumulator, currentValue) => {
      const quantity = currentValue?.quantity;
      const productTotal = currentValue?.price * quantity;
      const productDiscount = productTotal * (currentValue?.discountPercentage / 100);
  
      accumulator.totalPrice += productTotal;
      accumulator.discount += productDiscount;
  
      return accumulator;
    }, { totalPrice: 0, discount: 0 });

    setDiscount(result.discount)
    setTotalPrice(result.totalPrice)
  };

  useEffect(()=>{
    calculateRealPrice(productset)
  },[])

  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="w-full text-center md:mt-14 p-5">
        <p className="text-4xl font-bold my-4">
          Summary
        </p>
        <div className="mt-4 bg-white p-4 rounded-md">
          <table className="border-collapse border border-slate-400 text-center w-full">
            <thead>
              <tr className="border">
                <th className="border border-slate-300">image</th>
                <th className="border border-slate-300">Title</th>
                <th className="border border-slate-300">Price</th>
                <th className="border border-slate-300">quantity</th>
              </tr>
            </thead>
            <tbody>
              {productset.map((product:any, index:number) => (
                <tr key={index} className="hover:bg-slate-200 cursor-pointer">
                  <td className="flex justify-center">
                    <img src={product.thumbnail} alt={`${product.title} image`} className="w-14"/>
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
              {
                productset.length === 0 &&
                <tr>
                  <td colSpan={4} className="h-14">
                    No products in your cart.
                  </td>
                </tr>
              }
            </tbody>
          </table>
          <div className="mt-4 flex flex-col gap-2">
            <p className="flex justify-end gap-4 px-4">
              <span>Total</span> <span>{totalPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-end gap-4 px-4">
              <span>Discount</span> <span>{discount.toFixed(2)}</span>
            </p>
            <p className="flex justify-end gap-4 px-4 text-xl font-bold">
              <span>Final</span> <span>{(totalPrice - discount).toFixed(2)}</span>
            </p>
          </div>
          <div className="text-end px-4 mt-4">
              <Link to={'/home'}>
                <button className="mr-5">
                  Back
                </button>
              </Link>
              <button className="p-2 rounded-md bg-green-600 text-white">
                Payment
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}
