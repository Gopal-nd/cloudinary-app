import { NextRequest, NextResponse } from "next/server";
import { UploadImage,DeleteImage } from "@/lib/upload-image";
import { ImageGallaryModel } from "@/lib/image.model";
import { ConnectDB } from "@/lib/db.connection";

ConnectDB();
interface ImageData {
    secure_url: string;
    public_id: string;
    // Add other properties if necessary
}

export const DELETE = async (req:NextRequest,ctx:{params:{id:string}})=>{
    
    const imagePublicId = `next-Gallary/`+ctx.params.id
    const result= await DeleteImage(imagePublicId)


const images = await ImageGallaryModel.findOneAndDelete({public_id:imagePublicId})
// console.log(images)
return NextResponse.json({
    msg:result
},{status:200})
}

