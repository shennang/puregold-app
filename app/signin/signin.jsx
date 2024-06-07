"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected import for useRouter
import { supabase } from "../config/supabaseClient"; // Adjust the import path as necessary

// Style
import "../login/login.css";

function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Introduce a delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sign up the user
      let { data: signUpData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
        }
      );

      if (signUpError) {
        if (signUpError.message === "Email rate limit exceeded") {
          setError("Too many sign-up attempts. Please try again later.");
        } else {
          setError(signUpError.message);
        }
        return;
      }

      // Insert additional user details into the customer table
      let { error: insertError } = await supabase.from("customer").insert([
        {
          customer_name: username,
          customer_address: address,
          customer_phone_number: phonenumber,
          customer_email: email,
        },
      ]);

      if (insertError) {
        console.error("Insert Error:", insertError);
        setError(insertError.message);
      } else {
        setMessage(
          "User signed up successfully. Please check your email to confirm your account."
        );
        // Clear the form
        setUsername("");
        setEmail("");
        setPassword("");
        setPhonenumber("");
        setAddress("");
        // Redirect to login page after successful sign-up
        router.push("/");
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <h1>Please Sign Up</h1>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input
              type="text"
              className="input"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <p>Email</p>
            <input
              type="email"
              className="input"
              required
              placeholder="Email Address"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p>Phone Number</p>
            <input
              type="text"
              className="input"
              required
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </label>
          <label>
            <p>Address</p>
            <input
              type="text"
              className="input"
              required
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className="btn">
            <button className="submit" type="submit">
              Submit
            </button>
          </div>

          <div className="new">
            <p>
              Already have an Account? <Link href="/">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
