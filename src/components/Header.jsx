import React, { useEffect, useState } from "react";
import { auth, signOut, getRedirectResult } from "../utils/firebase";
import SignInButton from "./SignInButton";
import { FaTh, FaFlask, FaBars } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GiGemini } from "react-icons/gi";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Handle redirect result when user returns
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
          console.log("Redirect sign-in result:", result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect sign-in error:", error);
      });

    // 2. Auth state listener for persistent sign-in
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header className="flex items-center justify-between w-full px-4 py-3">
      {/* Left Side */}
      <div className="flex items-center space-x-4 text-sm text-gray-700">
        {user ? (
          <div className="flex items-center space-x-2 sm:flex md:hidden">
            <FaFlask size={24} title="Search Labs" />
          </div>
        ) : (
          <div className="flex items-center space-x-2 sm:flex md:hidden">
            <FaBars size={16} />
            <span className="cursor-pointer hover:underline">All</span>
            <span className="cursor-pointer hover:underline">Images</span>
          </div>
        )}

        {user && (
          <div className="hidden space-x-4 md:flex">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Store
            </a>
          </div>
        )}
      </div>

      {/* Middle section - visible on small devices */}
      <div className="block md:hidden">
        <div className="flex items-center justify-center gap-4 p-2 bg-gray-200 rounded-md">
          <div className="flex flex-row items-center px-2 py-1 bg-white rounded-md">
            <FcGoogle size={26} title="Google" />
            <span className="px-1 text-sm text-gray-800">Search</span>
          </div>
          <img src="/logo/gemini.png" alt="Google Gemini" className="w-6 h-6" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 text-sm text-gray-700">
        {!user && (
          <div className="hidden space-x-4 md:flex">
            <a href="#" className="hover:underline">
              Gmail
            </a>
            <a href="#" className="hover:underline">
              Images
            </a>
          </div>
        )}

        {user && (
          <div className="hidden space-x-4 md:flex">
            <a href="#" className="hover:underline">
              Gmail
            </a>
            <a href="#" className="hover:underline">
              Images
            </a>
            <button title="Google apps" className="hover:text-black">
              <FaTh size={18} />
            </button>
          </div>
        )}

        {/* Profile or Sign in */}
        {user ? (
          <div className="relative group">
            <div className="p-1 bg-gray-100 rounded-full">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={handleSignOut}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute hidden p-1 mt-2 text-xs bg-white border rounded shadow group-hover:block">
              Sign out
            </span>
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
}
