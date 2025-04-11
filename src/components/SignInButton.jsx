import React, { useEffect } from "react";
import {
  signInWithRedirect,
  getRedirectResult,
  auth,
  provider,
} from "../utils/firebase";

export default function SignInButton() {
  const handleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    // This runs after redirect sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("User signed in:", result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect sign-in error:", error);
      });
  }, []);

  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 text-sm text-white bg-blue-600 border border-gray-300 rounded-xl hover:shadow-md"
    >
      Sign in
    </button>
  );
}
