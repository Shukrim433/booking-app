import React from "react";
import Hero from "../components/Hero";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
const Home = () => {
  return (
    <>
      <Hero />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </>
  );
};

export default Home;
