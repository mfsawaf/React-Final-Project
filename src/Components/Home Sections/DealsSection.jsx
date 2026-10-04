import { useEffect, useState } from "react";
import {
  getHotDeals,
  getBestSellers,
  getTopRated,
} from "../../Services/productService";
import ProductListItem from "../Product/ProductListItem";
import Button from "../Common/Button";

const DealsSection = () => {
  const [hotDeals, setHotDeals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getHotDeals().then(setHotDeals);
    getBestSellers().then(setBestSellers);
    getTopRated().then(setTopRated);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12">
      <div>
        <h3 className="font-bold mb-4">Hot Deals</h3>
        <div className="flex flex-col gap-3">
          {hotDeals.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Best Seller</h3>
        <div className="flex flex-col gap-3">
          {bestSellers.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Top Rated</h3>
        <div className="flex flex-col gap-3">
          {topRated.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="bg-[#EDF2EE] rounded-xl p-6 flex flex-col items-center justify-center text-center">
        <p className="text-sm text-gray-500">Summer Sale</p>
        <h2 className="text-3xl font-bold text-green-600 my-2">75% off</h2>
        <Button />
      </div>
    </div>
  );
};

export default DealsSection;
