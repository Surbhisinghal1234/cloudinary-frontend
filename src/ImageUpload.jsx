import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ImageUpload() {
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const uploadImage = async () => {
    setLoading(true);
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
      console.log("Image uploaded successfully");
      setUrl(cloudData.url);

      await axios.post('https://cloudinary-backend-3r6b.onrender.com/photos', { url: cloudData.url });
      setMessage('URL saved');
      console.log('Image URL', cloudData.url);
      navigate('/imageget');
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false); 
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="bg-black text-white h-screen py-4 flex flex-col items-center gap-[2rem]">
        <h1 className="font-bold text-3xl">Upload Image</h1>
        <div className="gap-[1rem] flex flex-col">
          <div>
            <input
              type="file"
              className="rounded-md"
              onChange={handleFileChange}
            />
            {photo && (
              <img
                src={photo}
                alt="Photo"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </div>
          <button
            className={`bg-green-800 text-white rounded-md py-2 font-bold text-xl px-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={uploadImage}
            disabled={loading} 
          >
            {loading ? 'Uploading...' : 'Send'} 
          </button>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
