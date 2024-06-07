import React from "react";
import Image from "next/image";

import Navbar from "../components/signuphead";
import Puregold from "../assets/large_Puregold.jpg";
import Footer from "../components/footer";

import "../login/login.css";
import SignIn from "./signin";

export default function login() {
  return (
    <>
      <main className="mainp">
        <Navbar />
        <div className="mainhome-grid">
          <div className="puredetails">
            <Image
              className="puregoldhome"
              src={Puregold}
              alt="PureGold logo"
              width={500}
              placeholder="blur"
              quality={100}
            />
            <p className="tagline">Sa PUREGOLD, Always Panalo!</p>
          </div>
          <div className="login">
            <SignIn />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
