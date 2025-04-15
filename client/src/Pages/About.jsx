import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-14 px-6 md:px-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-16 tracking-wide">
          About CampusNotes
        </h1>

        {/* What is CampusNotes */}
        <section className="mb-16 bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            What is CampusNotes?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>CampusNotes</strong> is a student-powered platform where
            learners can upload, share, and access top-quality academic notes
            for free. Whether you're revising for exams, catching up on missed
            lectures, or just want a fresh perspective — CampusNotes has you
            covered.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-16 bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To make academic resources universally accessible by fostering a
            culture of sharing and learning among students across all colleges.
          </p>
        </section>

        {/* Who is it for */}
        <section className="mb-16 bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Who is it for?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
            <li>College students across all years and streams</li>
            <li>Learners who missed lectures and need quality material</li>
            <li>Contributors passionate about helping others</li>
            <li>Anyone looking for verified, concise study content</li>
          </ul>
        </section>

        {/* Features */}
        <section className="mb-16 bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-4"> Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-lg">
            <li> Upload and download academic notes</li>
            <li> Filter by college, course, semester, and subject</li>
            <li> Like, comment, and interact with other users</li>
            <li> Admin approval for quality assurance</li>
            <li> Simple, distraction-free UI</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
            <li>Free, fast, and easy-to-use</li>
            <li>Peer-reviewed and admin-approved content</li>
            <li>Modern, responsive, and mobile-friendly design</li>
            <li>Built by students, for students</li>
          </ul>
        </section>

        {/* Stats Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Platform Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
              <h3 className="text-4xl font-extrabold text-blue-800">1,200+</h3>
              <p className="text-gray-700">Notes Shared</p>
            </div>
            <div className="bg-green-100 p-6 rounded-2xl shadow-md">
              <h3 className="text-4xl font-extrabold text-green-800">500+</h3>
              <p className="text-gray-700">Students Helped</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQF1_8emDHjh3A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1689821341436?e=1750291200&v=beta&t=7EGEI-5PX5S_PzempyddUdbiWySH-O-YN8NyQMuucYA"
                alt="Bhavishya"
                className="rounded-full w-28 h-28 object-cover mb-4 border-4 border-blue-200"
              />
              <h3 className="text-xl font-semibold">Bhavishya Parmar</h3>
              <p className="text-gray-600">Full Stack Developer</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQF8n-7QXixUIw/profile-displayphoto-shrink_400_400/B56ZUo.oPgHoAk-/0/1740149264022?e=1750291200&v=beta&t=-4cr3RI5kbQdcA4inr18gzaRnEdfgTCi5pKC1alsiRc"
                alt="Manish"
                className="rounded-full w-28 h-28 object-cover mb-4 border-4 border-pink-200"
              />
              <h3 className="text-xl font-semibold">Manish Kumar Sharma</h3>
              <p className="text-gray-600">Full Stack Developer</p>
            </div>
          </div>
        </section>

        {/* Connect With Us */}
        <section className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 rounded-3xl shadow-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-800 text-lg mb-2">
            Have questions, feedback, or just want to say hi?
          </p>
          <p className="text-lg">
            Email us at:{" "}
            <a
              href="mailto:campusnotes@edu.com"
              className="text-blue-700 font-semibold underline"
            >
              campusnotes@email.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
