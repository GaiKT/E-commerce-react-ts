import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/products"; // Make sure your ProductsProps and Product interfaces are properly defined
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputText, setInputText] = useState('');
  const [operation, setOperation] = useState('all');

  const getProduct = async () => {
    try {
      const result = await axios.get('https://dummyjson.com/products',{
        headers: {
          CMReq: 'request',
        },
      });
      console.log(result)
      setProducts(result.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const more1000AndDiscount = (arr: Product[]) => {
    return arr.filter(item => item.price >= 1000 && item.discountPercentage > 0);
  };

  const addTotalPrice = (arr: Product[]) => {
    return arr.map(item => ({
      ...item,
      totalPrice: item.price - (item.price * item.discountPercentage / 100),
    }));
  };

  const sortProductRatingAndPrice = (arr: Product[]) => {
    return arr.sort((a, b) => {
      if (a.rating === b.rating) {
        return a.price - b.price;
      }
      return b.rating - a.rating;
    });
  };

  const filterAndSortProducts = (operation: string, products: Product[]) => {
    let filteredProducts = products;

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
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  const displayedProducts = filterAndSortProducts(operation, products);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 gap-5">
      <p className="text-4xl font-bold">Products</p>
      <div className="w-full flex justify-center gap-5">
        <div className="w-1/6 border p-4 flex flex-col gap-4 h-full">
          <div>
            <p>ค้นหา</p>
            <input
              type="text"
              className="border p-1"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
          </div>
          <div>
            <p>Filter your products</p>
            <select
              defaultValue="all"
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="all">All</option>
              <option value="1000up">มากกว่า 1000</option>
              <option value="totalPrice">ราคารวม</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        <table className="border-collapse border border-slate-400 w-4/6 text-center">
          <thead className="text-xl font-bold p-4">
            <tr className="border">
              <th className="border border-slate-300">Thumbnail</th>
              <th className="border border-slate-300">Title</th>
              <th className="border border-slate-300">Price</th>
              <th className="border border-slate-300">Stock</th>
              {operation === 'totalPrice' && <th className="border border-slate-300">Total</th>}
              <th className="border border-slate-300"></th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={index} className="hover:bg-slate-200 cursor-pointer">
                <td className="flex justify-center">
                  <img src={product.thumbnail} alt={`${product.title} image`} width={150} height={150} />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                {operation === 'totalPrice' && <td>{product.totalPrice}</td>}
                <td>
                  <Link to={`/detail/${product.id}`}>
                    <button className="underline text-blue-400">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
