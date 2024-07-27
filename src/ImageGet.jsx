
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGet() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/photos');
        setPhotos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="flex flex-col bg-black text-white  items-center gap-[2rem] py-4 ">
      <h1 className='text-3xl' >Get Image</h1>
      <div className='flex  flex-col md:flex-row gap-[1rem] px-[3rem] justify-center sm:flex-wrap' >
        {photos.length > 0 ? (
          photos.map((photo) => (
            <img className="h-[8rem] w-[8rem] rounded-md"

              
              src={photo.url}
              alt="Uploaded"
          
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}

export default ImageGet;

