import { useEffect, useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import Main from "../Components/Home Sections/Main";
import Container from "../Components/Common/Container";
import FeaturesBar from "../Components/Home Sections/FeaturesBar";
import FeaturedProducts from "../Components/Home Sections/FeaturedProducts";
import DealsSection from "../Components/Home Sections/DealsSection";
import NewestProducts from "../Components/Home Sections/NewestProducts";
import PromoBanners from "../Components/Home Sections/PromoBanners";

const Home = () => {
  return (
    <Container>
      <Main />
      <FeaturesBar />
      <FeaturedProducts />
      <DealsSection />
      <PromoBanners />
      <NewestProducts />
    </Container>
  );
};

export default Home;
