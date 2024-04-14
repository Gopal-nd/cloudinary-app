import { resolve } from "path";
import cloudinary from "./cloudinary";
import { error } from "console";
import { rejects } from "assert";

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

export const UploadImage = async(file:File,folder:string)=>{

const buffer = await file.arrayBuffer();
const bytes = Buffer.from(buffer)

  return new Promise((resolve,reject)=>{
    cloudinary.uploader.upload_stream({
      resource_type:"auto",
      folder:folder
    },async (error,result)=>{
      if(error){
        return reject(error.message)
      }
     return resolve(result)

    }).end(bytes);
   })
  }


export const DeleteImage = async(public_id:string)=>{
  return new Promise(async(resolve,rejects)=>{
    try {
     
      

        const result = await cloudinary.uploader.destroy(public_id);
      return resolve(result)
    } catch (error:any) {
      rejects(new Error(error.message))
    }
  })
}  