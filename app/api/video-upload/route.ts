import { NextResponse,NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
// Configuration
cloudinary.config({ 
    cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult{
    public_id: string;
    bytes:number;
    duration?:number;
    [key:string]:any
}

export async function POST(request:NextRequest) {
    
    if(
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ){
        return NextResponse.json({error:"cloudinary configuration is missing",success:false},{status:500})
    }
    try {
        const formData = await request.formData()
        const userId = formData.get("userId") as string
        if(!userId||userId===""){
            return NextResponse.json({error:"unauthorized",success:false},{status:500})
        }
        const file = formData.get("file") as File | null
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const originalSize = formData.get("originalSize") as string
        if(!file){
            return NextResponse.json({error:"file not found",success:false},{status:400})
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type:"video",
                        folder:"ai-saas-video",
                        transformation:[
                            {quality:"auto",fetch_format:"mp4"}
                        ]

                    },
                    (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(result as CloudinaryUploadResult)
                        }
                    }
                )
                uploadStream.end(buffer)
            }
        )
        const video = await prisma.video.create({
            data:{
                title,
                description,
                originalSize,
                publicId:result.public_id,
                compressedSize:String(result.bytes),
                duration:result.duration||0,
                userId
            }
        })
        return NextResponse.json({video,success:true},{status:201})
    } catch (error) {
        // console.log("cloudinary video upload error",error)
        return NextResponse.json({error:"failed to upload video",success:false},{status:500})
    }finally{
        await prisma.$disconnect()
    }

}