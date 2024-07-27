import { useState } from "react";
import axios from 'axios';
import {Link,Navigate, useNavigate} from "react-router-dom"

function ImageUpload() {
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate(); 

  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "testImage");
    data.append("cloud_name", "surbhisinghal");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/surbhisinghal/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      console.log(cloudData, "cloudData");
      console.log("Image upload sucessfully");
      setUrl(cloudData.url);

      await axios.post('http://localhost:3002/photos', { url: cloudData.url });
      setMessage('URL saved');
      console.log('Image URL', cloudData.url);
      navigate('/imageget');
    } catch (err) {
      console.log( "err");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPhoto(URL.createObjectURL(file));

  };
  return (
    <>
    <div className="bg-black text-white h-screen py-4 flex flex-col items-center gap-[2rem]" >

    <h1 className="font-bold text-3xl" >Upload Image</h1>
      <div className="  gap-[1rem] flex flex-col ">
        <div>
          <input type="file" className="rounded-md "  onChange={handleFileChange} />
          {photo && (
            <img
              src={photo}
              alt="Photo"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>
        <button className="bg-green-800 text-white rounded-md py-2 font-bold text-xl px-6"  onClick={uploadImage} >Send</button>
        <p>{message}</p>

      </div>
      </div>

    </>
  );
}

export default ImageUpload;