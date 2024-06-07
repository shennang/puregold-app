import Login from "./login/login";
import Navbar from "./components/loginhead";
import Image from "next/image";
import Puregold from "./assets/large_Puregold.jpg";
import Footer from "./components/footer";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Home() {
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
            <Login />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
