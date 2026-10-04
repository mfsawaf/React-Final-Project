import { useEffect, useState } from "react";
import { getAllProducts } from "../Services/productService";
import Navbar from "../Components/Layout/Navbar";
import Main from "../Components/Home Sections/Main";
import Container from "../Components/Common/Container";
import FeaturesBar from "../Components/Home Sections/FeaturesBar";

const Home = () => {
  return (
    <Container>
      <Main />
      <FeaturesBar />
    </Container>
  );
};

export default Home;
