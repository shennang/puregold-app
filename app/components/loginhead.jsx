"use client";
import Image from "next/image";
import Logo from "./images.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../config/supabaseClient"; // Adjust the import path as necessary

//style
import "./navbar.css";
import "../login/login.jsx";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAdmin = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let { data: user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Login successful, set the token
        //const token = user?.access_token;
        //setToken(token);
        // Redirect to homepage
        router.push("/admin");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <nav className="nav">
      <div className="img">
        <Image
          src={Logo}
          alt="PureGold logo"
          width={100}
          height={50}
          placeholder="blur"
          quality={100}
        />
      </div>
      <div className="puregold">
        <p className="colorlog">Log In</p>
      </div>
      <div className="need">
        <p
          className={`adminLog ${isModalOpen ? "blur-background" : ""}`}
          onClick={handleAdmin}
        >
          Admin Log In
        </p>
      </div>

      {isModalOpen && (
        <div className={`admin-overlay ${isModalOpen ? "show" : ""}`}>
          <button onClick={closeModal} className="adbotton">
            X
          </button>
          <div className="admin-wrapper">
            <h1>Welcome Admin!!</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label>
                <p>Email Address</p>
                <input
                  type="email"
                  className="input"
                  required
                  placeholder="Email Address" // Updated placeholder
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <p>Password</p>
                <input
                  type="password"
                  required
                  className="input"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div className="adminbtn">
                <button className="adminsubmit" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
