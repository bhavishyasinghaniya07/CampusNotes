import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Profile from "./Pages/Profile";
import Signout from "./Pages/Signup.jsx";
import About from "./Pages/About";
import Signup from "./Pages/Signup.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UploadingNotes from "./Pages/CreateUploading.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/uploading-notes" element={<UploadingNotes />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
