import React from "react";
import { Link } from "react-router";

const Button = () => {
  return (
    <Link to="/shop">
      <button className=" bg-[#20B526] text-white px-5 py-2 rounded-full font-medium shadow mt-2 cursor-pointer hover:bg-[#1a8f1b] transition duration-300">
        Shop Now →
      </button>
    </Link>
  );
};

export default Button;
