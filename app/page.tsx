'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const Home = () => {
  const [loading, setloading] = useState(false)
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<{
    image_url: string;
    public_id: string;
    _id: string;
  }[]>([]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post('/api/upload-image', formData);
      const data = await response.data;
      console.log(data);
      await FetchAllImage();
    } catch (error) {
      console.log(error);
    }
  };


  const onDeleteImage = async (e: string) => {
    console.log(e)
    setloading(true)
    try {
   

      const {data} = await axios.delete("/api/upload-image/"+e.replace("next-Gallary/","")); 

      console.log(data)
      await FetchAllImage();
    } catch (error) {
      console.log(error);
    }finally{
      setloading(false)
    }
  };



  const FetchAllImage = async () => {
    try {
      const response = await axios.get("/api/upload-image");
      const {images} = response.data
      console.log(images);
      setImages(images);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    async function hi(){

      await FetchAllImage();
    }
    hi()
  }, []);

  return (
    <>
      <form onSubmit={onSubmitHandler} className='w-1/2 max-auto'>
        <input onChange={onChangeHandler} type="file" />
        <button className='px-4 py-2 '>Upload</button>
      </form>

      <div className="px-10 flex flex-wrap gap-x-5">

        {images.map((img, i) => (
          <div key={i}>
            <p>{img.public_id}</p>
            <img src={img.image_url} alt="" width={300} height={200} />
            <button 
            disabled={loading}
            className='px-4 py-2 bg-blue-400 text-white disabled:bg-black  ' onClick={()=>onDeleteImage(img.public_id)}>{loading ? 'loading...':'delete'}</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
