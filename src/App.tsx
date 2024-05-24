import "./App.css";
import { useState, useEffect, useRef } from "react";
import { UilFileAlt } from "@iconscout/react-unicons";
import { Hero } from "./components/hero/hero";
import { About } from "./components/about/about";
import { Interests } from "./components/interests/interests";
import { VerticalLine } from "./components/verticalLine";
import { WhatIDo } from "./components/whatIDo/whatIDo";
import { Skillset } from "./components/skillset/skillset";
import { Contact } from "./components/contact/contact";
import { Footer } from "./components/footer/footer";
import { ContactMemoji } from "./components/contactMemoji/contactMemoji";

function App() {
  return (
    <>
      <nav className="nav">
        <div className="gummy-bear"></div>
        <div className="nav-backdrop"></div>
        <div className="container">
          <div className="nav-flex">
            <img width={"66px"} height={"66px"} src="./logo_white_static.png" />
            <ul className="nav-inner font-main font-size-14">
              <li>
                <a href="">ABOUT</a>
              </li>
              <li>
                <a href="">PROJECTS</a>
              </li>
              <li>
                <a href="">CONTACT</a>
              </li>
            </ul>
            <button className="primary-cta cta-border-white cta-with-icon font-main">
              <UilFileAlt size="24" color="#ffffff" />
              READ MY CV
            </button>
          </div>
        </div>
      </nav>
      <ContactMemoji />
      <Hero></Hero>
      <About></About>
      <div className="gap-120"></div>
      <Interests></Interests>
      <VerticalLine></VerticalLine>
      <WhatIDo></WhatIDo>
      <VerticalLine></VerticalLine>
      <Skillset></Skillset>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
}

export default App;
