// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInFailure,
//   signInStart,
//   signInSuccess,
// } from "../redux/user/userSlice.js";
// import OAuth from "../components/OAuth.jsx";

// const Signin = () => {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       dispatch(signInStart());
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();

//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         console.log("Token saved to localStorage:", data.token);
//       }

//       dispatch(signInSuccess(data));
//       navigate("/");
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//           <p className="text-gray-600 mt-2">Sign in to access your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label
//               htmlFor="email"
//               className="text-sm font-medium text-gray-700"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="your@email.com"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               id="email"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <Link
//                 to="/forgot-password"
//                 className="text-xs text-indigo-600 hover:text-indigo-800"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               id="password"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button
//             disabled={loading}
//             className=" cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Signing In...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </button>

//           <OAuth />

//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">or</span>
//             </div>
//           </div>
//         </form>

//         <div className="text-center mt-6">
//           <p className="text-gray-600">
//             Don't have an account?{" "}
//             <Link
//               to="/sign-up"
//               className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
//             >
//               Sign Up
//             </Link>
//           </p>
//         </div>

//         {error && (
//           <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
//             <div className="flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {error}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signin;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use state to track if navigation has occurred
  const [hasNavigated, setHasNavigated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart());

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData,
        { withCredentials: true }
      );

      const data = response.data;
      console.log("Login response:", data);

      dispatch(signInSuccess(data)); // Successfully signed in
    } catch (error) {
      console.error("Sign in error:", error);
      const errorMessage = error.response?.data?.message || "Failed to sign in";
      dispatch(signInFailure(errorMessage));
    }
  };

  // Separate useEffect to handle only the first navigation

  if (currentUser && !hasNavigated) {
    // Extract role, checking both possible structures
    const userRole = currentUser.role || currentUser.user?.role;
    console.log("Navigating based on role:", userRole);
    console.log("Full user object:", currentUser);

    setHasNavigated(true);

    if (userRole === "admin") {
      console.log("Attempting to navigate to /admin-dashboard");
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  }

  // Handling form submission and loading state
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while signing in
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 text-center mt-5">{error}</p>}

      {/* Debug Info (optional for dev) */}
      {import.meta.env.MODE !== "production" && currentUser && (
        <div className="mt-5 p-3 bg-gray-100 rounded text-sm">
          <p className="font-bold">Debug Info:</p>
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SignIn;
