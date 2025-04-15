import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const handleUploadClick = () => {
    // If you're storing token in localStorage (e.g., after login)
    const isLoggedIn = !!localStorage.getItem("token"); // or "user" if you're storing user info

    if (isLoggedIn) {
      navigate("/uploading-notes");
    } else {
      navigate("/signin"); // redirect to sign in page
    }
  };
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x500')",
          }}
        ></div>
        <div className="relative container mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Share & Discover Academic Notes Easily!
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            CampusNotes is your go-to platform to upload, download, and share
            academic notes across multiple colleges and courses!
          </p>
          <div className="space-x-4">
            <Link to={"/uploading-notes"}>
              <button className="cursor-pointer bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg hover:bg-yellow-600 transition">
                Upload Notes
              </button>
            </Link>
            <Link to={"/browse"}>
              <button className="cursor-pointer bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-gray-800 transition">
                Browse Notes
              </button>
            </Link>
            {/* <button className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-gray-800 transition">
              Join Us
            </button> */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 text-center bg-white">
        <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">1. Upload Notes</h3>
            <p>Share your study materials with fellow students.</p>
          </div>
          <div className="p-6 bg-green-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">2. Get Verified</h3>
            <p>
              Our team verifies the quality of the notes to ensure authenticity.
            </p>
          </div>
          <div className="p-6 bg-orange-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">3. Reach Students</h3>
            <p>Students can access your notes and benefit from them.</p>
          </div>
          <div className="p-6 bg-purple-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">4. Download & Learn</h3>
            <p>Download notes and start learning for your exams.</p>
          </div>
        </div>
      </section>

      {/* Why Use CampusNotes? */}
      <section className="py-20 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Use CampusNotes?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-1">
              Verified Quality Notes
            </h3>
            <p>
              All notes are verified by our team for authenticity and quality.
            </p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-1">Free Downloads</h3>
            <p>
              All notes are available for free, just download and start
              studying.
            </p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-1">Peer Reviews</h3>
            <p>Notes can be liked and reviewed by peers to ensure quality.</p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-1">Admin Approval</h3>
            <p>Admin ensures that every note meets our quality standards.</p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-1">User Interactions</h3>
            <p>Engage with other students through comments and likes.</p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-1">
              Collaborative Learning
            </h3>
            <p>Join a community of learners by sharing feedback.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Growing Community</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold">1,200+</h3>
            <p>Notes Shared</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold">500+</h3>
            <p>Students Helped</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold">50+</h3>
            <p>Colleges Covered</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p>Total Likes</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          What Students Are Saying
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <p>
              "CampusNotes helped me find the notes I needed for my final exams.
              Great platform!"
            </p>
            <p className="text-gray-600">- John Doe, BCA, XYZ University</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <p>
              "A fantastic place to upload and share notes. I’ve helped so many
              students!"
            </p>
            <p className="text-gray-600">- Jane Smith, MCA, ABC University</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Join the Movement!</h2>
        <p className="text-lg mb-6">
          Help 10,000+ students across India by sharing your notes today!
        </p>
        <Link to={"/uploading-notes"}>
          <button className="cursor-pointer bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg hover:bg-yellow-600 transition">
            Start Sharing
          </button>
        </Link>
      </section>

      {/* Stay Connected */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Stay Connected With Us</h2>
        <div className="flex justify-center gap-8">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Facebook
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Instagram
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Twitter
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
