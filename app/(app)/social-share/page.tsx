"use client";
import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CodeEditor from '@/components/CodeEditor'

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Instagram Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  "Facebook Post (1:1)": { width: 1200, height: 1200, aspectRatio: "1:1" },
  "Facebook Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "YouTube Thumbnail (16:9)": { width: 1280, height: 720, aspectRatio: "16:9" },
  "YouTube Channel Cover (2560:1440)": { width: 2560, height: 1440, aspectRatio: "16:9" },
  "Pinterest Pin (2:3)": { width: 1000, height: 1500, aspectRatio: "2:3" },
  "LinkedIn Cover (4:1)": { width: 1584, height: 396, aspectRatio: "4:1" },
  "Snapchat Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "TikTok Video (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "Twitch Profile Banner (120:48)": { width: 1200, height: 480, aspectRatio: "120:48" },
  "Twitch Offline Screen (16:9)": { width: 1920, height: 1080, aspectRatio: "16:9" },
};  

type SocialFormat = keyof typeof socialFormats;
interface User {
  email:string   
  name:string
  videos: object
  isPaid:boolean
  order:{
      plan:string
  }
}
function SocialShare() {
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [id, setId] = useState<string>("");
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [uploadedImage, selectedFormat]);

  const getUserId = async () => {
    const response = await axios.get("/api/get-token");
    if (!response.data.success) {
      toast.error("Failed to upload");
    }
    setId(response.data.decodedToken.id);
    const user = await axios.post("/api/user",{id:response.data.decodedToken.id})
    if(!user.data.user){
        toast.error("Failed to upload")
        return
    }
    setUser(user.data.user)
  };

  useEffect(() => {
    getUserId(); // Call the async function inside useEffect
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", id);
    // console.log([...formData.entries()]);
    try {
      const response = await axios.post("/api/image-upload", formData);
      // console.log(response);
      if (!response.data.success) {
        throw new Error("failed to upload the image");
      }
      setUploadedImage(response.data.publicId);
    } catch (error) {
      // console.log("err in uploading", error);
      alert("failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  };
  const handleUpload=async()=>{
    if(user?.isPaid){
      const res = await axios.post("/api/add-image",{userId:id,img:imageRef.current?.src})
      if(!res.data.success){
          toast.error("Failed to add image")
      }
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-6 text-center gradient-title">
        Social Media Image Creator
      </h1>

      <div className="card bg-blue-100 dark:bg-black">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose an image file</span>
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="file-input file-input-bordered text-black file-input-primary w-full bg-blue-50"
            />
          </div>

          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full bg-blue-200"></progress>
            </div>
          )}

          {uploadedImage && (
            <div className="mt-6">
              <h2 className="card-title mb-4">Select Social Media Format</h2>
              <div className="form-control">
                <select
                  className="select select-bordered w-full bg-white border-blue-300 text-blue-900"
                  value={selectedFormat}
                  onChange={(e) => {
                    setSelectedFormat(e.target.value as SocialFormat)
                    handleUpload()
                  }}
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <div className="flex justify-center">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-50 z-10">
                      <span className="loading loading-spinner loading-lg text-blue-600"></span>
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary bg-blue-600 text-white hover:bg-blue-700" onClick={handleDownload}>
                  Download for {selectedFormat}
                </button>
              </div>
              <div className="card-actions justify-end mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <button  className='btn btn-primary ml-3' >Get Code</button>
                </DialogTrigger>
                <DialogContent className="w-full h-full max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
                  <div className='w-full h-full flex items-center justify-center'>
                    <DialogTitle>Code Snippet</DialogTitle>
                  </div>
                  <div className="w-full h-full max-h-[600px] overflow-auto">
            <CodeEditor generatedCode={`
import {CldImage} from "next-cloudinary"
// social formats refers to array of different formats 
const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
}
<CldImage
  width={socialFormats[selectedFormat].width}
  height={socialFormats[selectedFormat].height}
  src={uploadedImage} // the url obtained after uploading from cloudinary
  sizes="100vw"
  alt="transformed image"
  crop="fill"
  aspectRatio={socialFormats[selectedFormat].aspectRatio}
  gravity="auto"
  ref={imageRef} // reference to the image
/>
`
}/>
                </div>
                
                </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SocialShare;
