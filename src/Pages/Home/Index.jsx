import { useEffect, useState } from "react";
import Container from "../../Components/Common/Container";
import Main from "../../Components/Home Sections/Main";
import FeaturesBar from "../../Components/Home Sections/FeaturesBar";
import FeaturedProducts from "../../Components/Home Sections/FeaturedProducts";
import DealsSection from "../../Components/Home Sections/DealsSection";
import NewestProducts from "../../Components/Home Sections/NewestProducts";
import PromoBanners from "../../Components/Home Sections/PromoBanners";
import Testimonials from "../../Components/Home Sections/Testimonials";

const Home = () => {
  return (
    <Container>
      <Main />
      <FeaturesBar />
      <FeaturedProducts />
      <DealsSection />
      <PromoBanners />
      <NewestProducts />
      <Testimonials />
    </Container>
  );
};

export default Home;
