import { NextResponse,NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';


// Configuration
cloudinary.config({ 
    cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult{
    public_id: string;
    [key:string]:any
}

export async function POST(request:NextRequest) {
    try {
        const formData = await request.formData()
        const userId = formData.get("userId") as string
        // console.log(userId)
        if(!userId||userId===""){
            return NextResponse.json({error:"unauthorized",success:false},{status:500})
        }
        const file = formData.get("file") as File | null
        // console.log(file)
        if(!file){
            return NextResponse.json({error:"file not found",success:false},{status:400})
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder:"ai-saas-image"},
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
        return NextResponse.json({publicId:result.public_id,success:true},{status:201})
    } catch (error) {
        // console.log("cloudinary image upload error",error)
        return NextResponse.json({error:"failed to upload image",success:false},{status:500})
    }

}