// src/components/SignInButton.jsx
import React from "react";
import { signInWithPopup, auth, provider } from "../utils/firebase";

export default function SignInButton() {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 text-sm text-white bg-blue-600 border border-gray-300 rounded-xl hover:shadow-md"
    >
      Sign in
    </button>
  );
}
