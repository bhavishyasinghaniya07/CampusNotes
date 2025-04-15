// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRef } from "react";
// import { Link } from "react-router-dom";
// import {
//   signInFailure,
//   updateUserFailure,
//   updateUserStart,
//   updateUserSuccess,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutUserFailure,
//   signOutUserStart,
//   signOutUserSuccess,
// } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";
// const Profile = () => {
//   const fileRef = useRef(null);
//   const { currentUser } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [formData, setFormData] = useState({});
//   const dispatch = useDispatch();
//   const [showUploadsError, setShowUploadsErrors] = useState(false);
//   const [userUploads, setUserUploads] = useState([]);

//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("avatar", file);
//     formData.append("username", formData.username || currentUser.username);
//     formData.append("email", formData.email || currentUser.email);
//     if (formData.password) formData.append("password", formData.password);

//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${currentUser.token}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());
//       const res = await fetch("/api/auth/signout");
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(data.message));
//     }
//   };

//   const handleShowUploads = async () => {
//     try {
//       setShowUploadsErrors(false);
//       const res = await fetch(`/api/user/uploads/${currentUser._id}`);
//       const data = await res.json();
//       if (data.success === false) {
//         setShowUploadsErrors(true);
//         return;
//       }

//       setUserUploads(data);
//     } catch (error) {
//       showUploadsError(true);
//     }
//   };

//   const handleNotesDelete = async (uploadingId) => {
//     try {
//       const res = await fetch(`/api/uploading/delete/${uploadingId}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }
//       setUserUploads((prev) =>
//         prev.filter((uploads) => uploads._id !== uploadingId)
//       );
//     } catch (error) {
//       console.log(error.message);
//       return;
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto ">
//       <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           onChange={(e) => setFile(e.target.files[0])}
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           src={currentUser.avatar}
//           alt="profile"
//           className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
//         />
//         <input
//           type="text"
//           placeholder="username"
//           defaultValue={currentUser.username}
//           className="border p-3 rounded-lg"
//           id="username"
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="email"
//           defaultValue={currentUser.email}
//           className="border p-3 rounded-lg"
//           id="email"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="password"
//           className="border p-3 rounded-lg"
//           id="password"
//           onChange={handleChange}
//         />
//         <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
//           Update
//         </button>
//         <Link
//           to={"/uploading-notes"}
//           className="bg-green-700 p-3 rounded-lg uppercase text-white text-center hover:opacity-95"
//         >
//           Upload Your Notes
//         </Link>
//       </form>
//       <div className="flex justify-between mt-5">
//         <span
//           onClick={handleDeleteUser}
//           className="text-red-700 cursor-pointer  "
//         >
//           Delete Account
//         </span>
//         <span onClick={handleSignOut} className="text-red-700 cursor-pointer  ">
//           Sign out
//         </span>
//       </div>
//       <button onClick={handleShowUploads} className="text-green-700 w-full">
//         See Your Previous Uploads
//       </button>
//       <p className="text-red-700 mt-5">
//         {showUploadsError ? "There is some error" : ""}
//       </p>

//       {userUploads && userUploads.length > 0 && (
//         <div className="flex flex-col gap-4">
//           <h1 className="text-center mt-7 text-2xl font-semibold">
//             Your Uploads
//           </h1>
//           {userUploads.map((uploads) => (
//             <div
//               className="border rounded-lg p-3 flex justify-between items-center gap-4"
//               key={uploads._id}
//             >
//               <Link to={`/uploads/${uploads._id}`}>
//                 <img
//                   src={
//                     "https://imgs.search.brave.com/H1KkuYazb182pxLVqoy1tnc6R0jU1urQdszmuBMXakM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0LzQ1Lzkw/LzM2MF9GXzI5NDQ1/OTA4N19ZYmhEZUdW/a0lkaUltUjV0SUVY/dGx3aFcwWktlRnRw/ZC5qcGc"
//                   }
//                   alt="Notes cover"
//                   className="h-16 w-16 object-contain"
//                 />
//               </Link>
//               <Link
//                 className="text-slate-700 font-semibold flex-1 hover:underline truncate"
//                 to={`/uploads/${uploads._id}`}
//               >
//                 <p>{uploads.title}</p>
//               </Link>
//               <div className="flex items-center flex-col">
//                 <button
//                   className="text-red-700 uppercase"
//                   onClick={() => handleNotesDelete(uploads._id)}
//                 >
//                   Delete
//                 </button>
//                 <Link to={`/update-notes/${uploads._id}`}>
//                   <button className="text-green-700 uppercase">Edit</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showUploadsError, setShowUploadsErrors] = useState(false);
  const [userUploads, setUserUploads] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = async (file) => {
    const form = new FormData();
    form.append("avatar", file);
    form.append("username", formData.username || currentUser.username);
    form.append("email", formData.email || currentUser.email);
    if (formData.password) form.append("password", formData.password);

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowUploads = async () => {
    try {
      setShowUploadsErrors(false);
      const res = await fetch(`/api/user/uploads/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowUploadsErrors(true);
        return;
      }
      setUserUploads(data);
    } catch (error) {
      setShowUploadsErrors(true);
    }
  };

  const handleNotesDelete = async (uploadingId) => {
    try {
      const res = await fetch(`/api/uploading/delete/${uploadingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserUploads((prev) =>
        prev.filter((uploads) => uploads._id !== uploadingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-8 text-slate-800">
        Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white shadow-lg p-6 rounded-lg"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-28 w-28 object-cover cursor-pointer self-center border-4 border-blue-200 shadow-md"
        />
        <p className="text-green-500 text-center">
          Welcome {currentUser.username}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-blue-400"
        />
        <input
          type="password"
          placeholder="New Password"
          id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-blue-400"
        />
        <button className="cursor-pointer bg-blue-600 text-white py-3 rounded-lg uppercase font-semibold hover:bg-blue-700 transition">
          Update Profile
        </button>
        <Link
          to="/uploading-notes"
          className="bg-green-600 text-white py-3 text-center rounded-lg uppercase font-semibold hover:bg-green-700 transition"
        >
          Upload Notes
        </Link>
      </form>

      <div className="flex justify-between mt-6 text-sm font-medium text-slate-600">
        <button
          onClick={handleDeleteUser}
          className="cursor-pointer text-red-600 hover:underline"
        >
          Delete Account
        </button>
        <button
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 hover:underline"
        >
          Sign Out
        </button>
      </div>

      <button
        onClick={handleShowUploads}
        className="cursor-pointer text-green-600 mt-6 w-full font-semibold underline hover:text-green-800"
      >
        See Your Uploaded Notes
      </button>
      {showUploadsError && (
        <p className="text-red-600 mt-3">
          There was an error loading your uploads.
        </p>
      )}

      {userUploads.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {userUploads.map((upload) => (
            <div
              key={upload._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <Link to={`/notes/${upload._id}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                  alt="Notes Icon"
                  className="h-20 mx-auto"
                />
              </Link>
              <Link
                to={`/notes/${upload._id}`}
                className="mt-3 text-center text-lg font-semibold text-slate-800 truncate hover:underline"
              >
                {upload.title}
              </Link>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleNotesDelete(upload._id)}
                  className="cursor-pointer text-sm text-red-600 font-bold uppercase hover:underline"
                >
                  Delete
                </button>
                <Link
                  to={`/update-notes/${upload._id}`}
                  className="cursor-pointer text-sm text-green-600 font-bold uppercase hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
