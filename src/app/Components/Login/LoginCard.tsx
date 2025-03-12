"use client"
import React, { useState } from "react";
import { FaEnvelope, FaFacebook, FaGoogle, FaApple, FaArrowLeft  } from "react-icons/fa";
import {loginWithEmailAndPassword} from "../../helpers/firebase/auth"

const LoginCard: React.FC = () => {
  interface InputState {
  email: string;
  password: string;
}


  const [showEmailForm, setShowEmailForm] = useState(false);
const [input, setInput] = useState<InputState>({ email: '', password: '' });
// const [input, setInput] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({...prev, [e.target.name]: e.target.value }))
  }

  // const handleLoginClick = async() => {
  //   try {
  //     await loginWithEmailAndPassword(input.email, input.password);
  //     goto("/");
  //   } catch (err) {
  //     error(err);
  //     alert(err);
  //   }
  // }

  const handleLoginClick = async () => {
    // fetch("https://api.example.com/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: input.email,
    //     password: input.password,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => console.log("Login successful", data))
    //   .catch(error => console.error("Login failed", error));
  }
  return (
    <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg max-w-md w-full relative z-10">
      <h3 className="text-2xl font-bold text-center">Log in</h3>
      <hr className="my-4" />

      {/* Toggle Email Login Form */}
      {!showEmailForm ? (
        <button
          onClick={() => setShowEmailForm(true)}
          className="flex items-center justify-center w-full py-3 my-2 border border-gray-400 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          <FaEnvelope className="mr-2" /> Sign in with Email
        </button>
      ) : (
        <div className="space-y-4">
          <button
              type="button"
              onClick={() => setShowEmailForm(false)}
              className="flex w-full text-gray-500 hover:underline"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      )}

      {/* Other Login Options */}
      {!showEmailForm && (
        <>
          <button className="flex items-center justify-center w-full py-3 my-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">
            <FaFacebook className="mr-2" /> Log In with Facebook
          </button>
          <button className="flex items-center justify-center w-full py-3 my-2 bg-gray-100 rounded-md font-semibold hover:bg-gray-200">
            <FaGoogle className="mr-2" /> Log In with Google
          </button>
          <button className="flex items-center justify-center w-full py-3 my-2 bg-black text-white rounded-md font-semibold hover:bg-gray-900">
            <FaApple className="mr-2" /> Log In with Apple
          </button>
        </>
      )}

      <p className="text-center mt-3 text-gray-600">
        Don’t have an account? <a href="#" className="text-green-600 font-bold">Sign up</a>
      </p>
    </div>
  );
};

export default LoginCard;
