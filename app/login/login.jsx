"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../config/supabaseClient"; // Adjust the import path as necessary

//style
import "./login.css";

function Login() {
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
        router.push("/homepage");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <h1>Please Log In</h1>
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
          <div className="btn">
            <button className="submit" type="submit">
              Submit
            </button>
          </div>

          <div className="new">
            <p>
              New to this website? <Link href="./signin">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
