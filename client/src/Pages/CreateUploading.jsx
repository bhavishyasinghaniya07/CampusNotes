import React from "react";
import { useState } from "react";

const CreateUploading = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const courses = [
    // Engineering (B.Tech/B.E)
    "Computer Science Engineering (B.Tech/B.E)",
    "Mechanical Engineering (B.Tech/B.E)",
    "Civil Engineering (B.Tech/B.E)",
    "Electrical Engineering (B.Tech/B.E)",
    "Electronics and Communication Engineering (B.Tech/B.E)",
    "Information Technology (B.Tech/B.E)",
    "Biotechnology Engineering (B.Tech/B.E)",
    "Chemical Engineering (B.Tech/B.E)",
    "Aerospace Engineering (B.Tech/B.E)",
    "Agricultural Engineering (B.Tech/B.E)",

    // Bachelor of Science (BSc)
    "BSc Physics",
    "BSc Chemistry",
    "BSc Mathematics",
    "BSc Biotechnology",
    "BSc Zoology",
    "BSc Microbiology",
    "BSc Botany",

    // Bachelor of Commerce (B.Com)
    "B.Com General",
    "B.Com Honours",
    "B.Com Accounting and Finance",
    "B.Com Computer Applications",

    // Bachelor of Arts (BA)
    "BA English",
    "BA Political Science",
    "BA History",
    "BA Psychology",
    "BA Sociology",
    "BA Economics",
    "BA Philosophy",

    // Bachelor of Business Administration (BBA)
    "General BBA",
    "BBA in Finance",
    "BBA in Marketing",
    "BBA in HRM (Human Resource Management)",
    "BBA in International Business",

    // Bachelor of Design (BDes)
    "BDes Fashion Design",
    "BDes Graphic Design",
    "BDes Product Design",

    // Bachelor of Fine Arts (BFA)
    "BFA Painting",
    "BFA Sculpture",
    "BFA Applied Arts",

    // Bachelor of Hotel Management (BHM)
    "Bachelor of Hotel Management (BHM)",

    // Bachelor of Law (LLB)
    "Bachelor of Law (LLB)",

    // Postgraduate Courses (PG)
    // Master of Science (MSc)
    "MSc Physics",
    "MSc Chemistry",
    "MSc Mathematics",
    "MSc Biotechnology",
    "MSc Microbiology",
    "MSc Environmental Science",
    "MSc Computer Science",

    // Master of Business Administration (MBA)
    "MBA General",
    "MBA in Marketing",
    "MBA in Finance",
    "MBA in HRM (Human Resource Management)",
    "MBA in International Business",
    "MBA in Operations",
    "MBA in Healthcare Management",
    "MBA in Digital Marketing",

    // Master of Commerce (MCom)
    "MCom in Accounting",
    "MCom in Business Management",
    "MCom in Banking and Finance",

    // Master of Arts (MA)
    "MA Economics",
    "MA Political Science",
    "MA English Literature",
    "MA Psychology",
    "MA History",
    "MA Sociology",
    "MA Education",

    // Master of Technology (MTech)
    "MTech in Computer Science",
    "MTech in Civil Engineering",
    "MTech in Mechanical Engineering",
    "MTech in Electronics and Communication",
    "MTech in Information Technology",
    "MTech in Data Science",

    // Master of Fine Arts (MFA)
    "MFA in Painting",
    "MFA in Sculpture",
    "MFA in Photography",
    "MFA in Applied Arts",

    // Master of Design (MDes)
    "MDes in Product Design",
    "MDes in Communication Design",
    "MDes in Fashion Design",

    // Master of Law (LLM)
    "Master of Law (LLM)",

    // Postgraduate Diploma Courses
    "PG Diploma in Digital Marketing",
    "PG Diploma in Management",
    "PG Diploma in Journalism",

    // Doctoral (PhD and Doctorate) Courses
    "PhD in Computer Science",
    "PhD in Engineering",
    "PhD in Physics",
    "PhD in Chemistry",
    "PhD in Economics",
    "PhD in Mathematics",
    "PhD in Environmental Science",
    "PhD in Political Science",
    "PhD in Literature",
    "PhD in Business Administration",
    "PhD in Sociology",

    // Doctor of Medicine (MD)
    "Doctor of Medicine (MD)",

    // Doctor of Dental Surgery (DDS)
    "Doctor of Dental Surgery (DDS)",

    // Doctor of Pharmacy (PharmD)
    "Doctor of Pharmacy (PharmD)",

    // Doctor of Veterinary Science (DVM)
    "Doctor of Veterinary Science (DVM)",

    // Doctor of Education (EdD)
    "Doctor of Education (EdD)",

    // Diplomas and Certificate Programs
    "Diploma in Graphic Design",
    "Diploma in Hotel Management",
    "Diploma in Nursing",
    "Diploma in Animation",
    "Diploma in Interior Design",
    "Certificate in Digital Marketing",
    "Certificate in Web Development",

    // Add MCA (Master of Computer Applications)
    "MCA (Master of Computer Applications)",
  ];

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file in state
  };
  return (
    <main>
      <form className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 mt-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          📄 Upload Your Notes
        </h2>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-gray-700 font-semibold"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g. Data Structures Notes"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-gray-700 font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Short summary..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        {/* File URL */}
        <div>
          <label
            htmlFor="file"
            className="block mb-2 text-gray-700 font-semibold"
          >
            Upload File (PDF, DOC, etc.)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          {file && (
            <p className="text-sm text-gray-600 mt-2">
              Selected file: {file.name}
            </p>
          )}{" "}
          {/* Show the file name after selecting */}
        </div>

        {/* College Name */}
        <div>
          <label
            htmlFor="collegeName"
            className="block mb-2 text-gray-700 font-semibold"
          >
            College Name
          </label>
          <input
            type="text"
            id="collegeName"
            placeholder="e.g. XYZ University"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Searchable Course */}
        <div>
          <label
            htmlFor="courseName"
            className="block mb-2 text-gray-700 font-semibold"
          >
            Course
          </label>
          <input
            type="text"
            id="courseName"
            placeholder="Search for Course"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {/* Display Filtered Course Options */}
          <div className="max-h-40 overflow-y-auto mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredCourses.map((course, index) => (
              <div key={index} className="p-3 hover:bg-gray-100 cursor-pointer">
                {course}
              </div>
            ))}
          </div>
        </div>

        {/* Batch */}
        <div>
          <label
            htmlFor="batch"
            className="block mb-2 text-gray-700 font-semibold"
          >
            Batch
          </label>
          <select
            id="batch"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Batch</option>
            <option value="2020-2024">2020-2024</option>
            <option value="2021-2025">2021-2025</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Semester
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <label
                key={sem}
                className="flex items-center gap-2 text-gray-600 text-sm"
              >
                <input type="radio" name="semester" value={sem} required />
                Sem {sem}
              </label>
            ))}
          </div>
        </div>

        {/* Subject Name */}
        <div>
          <label
            htmlFor="subjectName"
            className="block mb-2 text-gray-700 font-semibold"
          >
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            placeholder="e.g. DBMS"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Confirmation */}
        <div className="flex items-start gap-3">
          <input type="checkbox" id="confirm" required className="mt-1" />
          <label htmlFor="confirm" className="text-sm text-gray-700">
            I confirm this is original content and I have permission to share
            it.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          🚀 Upload Note
        </button>
      </form>
    </main>
  );
};

export default CreateUploading;
