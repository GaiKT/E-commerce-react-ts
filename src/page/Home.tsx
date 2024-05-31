import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Product } from "../interfaces/products";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputText, setInputText] = useState('');
  const [operation, setOperation] = useState('all');
  const nevigate = useNavigate()

  const getProduct = useCallback(async () => {
    try {
      const result = await axios.get('https://dummyjson.com/products');
      setProducts(result.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const more1000AndDiscount = useCallback((arr: Product[]) => {
    return arr.filter(item => item.price >= 1000 && item.discountPercentage > 0);
  }, []);

  const addTotalPrice = useCallback((arr: Product[]) => {
    return arr.map(item => ({
      ...item,
      totalPrice: item.price - item.price * item.discountPercentage / 100,
    }));
  }, []);

  const sortProductRatingAndPrice = useCallback((arr: Product[]) => {
    return [...arr].sort((a, b) => {
      if (a.rating === b.rating) {
        return a.price - b.price;
      }
      return b.rating - a.rating;
    });
  }, []);

  const filterAndSortProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (operation === '1000up') {
      filteredProducts = more1000AndDiscount(filteredProducts);
    } else if (operation === 'totalPrice') {
      filteredProducts = addTotalPrice(filteredProducts);
    } else if (operation === 'rating') {
      filteredProducts = sortProductRatingAndPrice(filteredProducts);
    }

    if (inputText) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(inputText.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, inputText, operation, more1000AndDiscount, addTotalPrice, sortProductRatingAndPrice]);

  const nevigatePage = (product_id:number) => {
    nevigate('/detail/' + product_id)
  }

  if (products.length === 0) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center pb-10 gap-3">
      <Navbar/>
      <p className="text-4xl font-bold my-4">Products</p>
      <div className="w-full flex justify-center gap-5 max-md:flex-col max-md:p-4">
        <div className="md:w-1/6 border p-4 flex flex-col gap-4 h-full text-center bg-white rounded-md shadow-md">
          <div>
            <input
              placeholder="Search"
              type="text"
              className="border p-1 rounded-md"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
          </div>
          <div>
            <p>Filter Your Products</p>
            <select
              defaultValue="all"
              onChange={(e) => setOperation(e.target.value)}
              className="p-1 border rounded-md mt-2"
            >
              <option value="all">All</option>
              <option value="1000up">1000</option>
              <option value="totalPrice">Totalprice</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        <table className="md:w-4/6 text-center max-md:text-xs border bg-white rounded-md shadow-md">
          <thead className="md:text-xl md:p-4">
            <tr>
              <th className="border">Thumbnail</th>
              <th className="border">Title</th>
              <th className="border">Price</th>
              <th className="border">Stock</th>
              {operation === 'totalPrice' && <th className="border border-slate-300">Total</th>}
            </tr>
          </thead>
          <tbody>
            {filterAndSortProducts.map((product, index) => (
                <tr key={index} onClick={()=> nevigatePage(product.id)} className="hover:bg-slate-100 cursor-pointer">
                  <td className="flex justify-center">
                    <img src={product.thumbnail} alt={`${product.title} image`} className="w-20" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  {operation === 'totalPrice' && <td>{product.totalPrice.toFixed(2)}</td>}
                </tr>
              ))}
                {
                filterAndSortProducts.length === 0 &&
                <tr>
                  <td colSpan={5} className="h-14">
                    No products match your keyword.
                  </td>
                </tr>
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}
