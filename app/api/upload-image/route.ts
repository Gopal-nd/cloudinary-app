import { NextRequest, NextResponse } from "next/server";
import { UploadImage } from "@/lib/upload-image";
import { ImageGallaryModel } from "@/lib/image.model";
import { ConnectDB } from "@/lib/db.connection";

ConnectDB();
interface ImageData {
    secure_url: string;
    public_id: string;
    // Add other properties if necessary
}

export const GET = async (req:NextRequest,res:NextResponse)=>{
const images = await ImageGallaryModel.find({})
// console.log(images)
return NextResponse.json({
    images: images, total:images.length
},{status:200})
}


export const POST = async (req: NextRequest, res: NextRequest) => {
    const formdata = await req.formData();
    const image = formdata.get("image") as unknown as File;
    const data = await UploadImage(image, "next-Gallary");

    await ImageGallaryModel.create({
        image_url: data?.secure_url,
        public_id: data?.public_id,
    });

    return NextResponse.json({ msg: data }, { status: 200 });
};
