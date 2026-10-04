import { Link } from "react-router";
import Button from "../Common/Button";

const Main = () => {
  return (
    <div className="box flex bg-[#EDF2EE]  py-31.5 px-20 justify-between items-center mt-10 rounded-2xl">
      <div>
        <p className="text-sm text-[#20B526] capitalize">Welcome to Shoppery</p>
        <h1 className="text-[72px] font-bold">Fresh & Healthy Organic Food</h1>
        <p className=" text-[32px] text-md">
          Sale up to<span className="text-orange-400"> 30% Off</span>
        </p>
        <p className="text-[14px] text-[#808080]">
          Free shipping on all your order. we deliver, you enjoy
        </p>
        <Link to="/shop">
        <div className="mt-6">
          <Button />
        </div>
        </Link>
      </div>
      <div>
        <img src="/MainVegetables.png" alt="Vegetables" />
      </div>
    </div>
  );
};

export default Main;
