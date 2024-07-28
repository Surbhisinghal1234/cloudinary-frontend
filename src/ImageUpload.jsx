// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// function ImageUpload() {
//   const [image, setImage] = useState("");
//   const [photo, setPhoto] = useState("");
//   const [url, setUrl] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false); 

//   const navigate = useNavigate();

//   const uploadImage = async () => {
//     setLoading(true);
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "testImage");
//     data.append("cloud_name", "surbhisinghal");
//     try {
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/surbhisinghal/image/upload",
//         {
//           method: "POST",
//           body: data,
//         }
//       );

//       const cloudData = await res.json();
//       console.log(cloudData, "cloudData");
//       console.log("Image uploaded successfully");
//       setUrl(cloudData.url);

//       await axios.post('https://cloudinary-backend-3r6b.onrender.com/photos', { url: cloudData.url });
//       setMessage('URL saved');
//       console.log('Image URL', cloudData.url);
//       navigate('/imageget');
//     } catch (err) {
//       console.log("Error", err);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//     setPhoto(URL.createObjectURL(file));
//   };

//   return (
//     <>
//       <div className="bg-black text-white h-screen py-4 flex flex-col items-center gap-[2rem]">
//         <h1 className="font-bold text-3xl">Upload Image</h1>
//         <div className="gap-[1rem] flex flex-col">
//           <div>
//             <input
//               type="file"
//               className="rounded-md"
//               onChange={handleFileChange}
//             />
//             {photo && (
//               <img
//                 src={photo}
//                 alt="Photo"
//                 style={{ width: "100px", height: "100px" }}
//               />
//             )}
//           </div>
//           <button
//             className={`bg-green-800 text-white rounded-md py-2 font-bold text-xl px-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             onClick={uploadImage}
//             disabled={loading} 
//           >
//             {loading ? 'Uploading...' : 'Send'} 
//           </button>
//           <p>{message}</p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ImageUpload;


import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPhoto(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!image) return;

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'testImage');
    data.append('cloud_name', 'surbhisinghal');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/surbhisinghal/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const cloudData = await response.json();
      console.log('Cloudinary response:', cloudData);
      return cloudData.url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      setMessage('Error uploading image to Cloudinary');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First upload the image to Cloudinary
      const imageUrl = await uploadImage();
      if (!imageUrl) return; // Exit if the image upload failed

      // Then send the form data, including the Cloudinary image URL, to the backend
      const userData = {
        name,
        email,
        description,
        image: imageUrl,
      };

      await axios.post('http://localhost:3000/users', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('User added successfully');
      setName('');
      setEmail('');
      setDescription('');
      setImage(null);
      setPhoto('');
    } catch (error) {
      console.error('Error uploading user data:', error);
      setMessage('Error uploading user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-[3rem] px-[2rem]'>
      <h2>Add User</h2>
      <form className='flex flex-col gap-[1rem] mt-[2rem]' onSubmit={handleSubmit}>
        <div className='flex gap-[.5rem] items-center'>
          <label>Name - </label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="text"
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Email - </label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Description - </label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="text"
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Upload Image -</label>
          <input
            type="file"
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            onChange={handleFileChange}
          />
          {photo && (
            <div>
              <img src={photo} alt="Preview" style={{ maxWidth: '300px' }} />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`bg-gray-800 text-white px-[1rem] py-[.5rem] rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/getUsers">
        <button className='bg-black text-white px-[1rem] py-[.3rem] mt-[1rem] rounded-md'>
          Next
        </button>
      </Link>
    </div>
  );
};

export default UserForm;
