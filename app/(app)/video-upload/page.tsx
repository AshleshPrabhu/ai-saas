"use client"
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
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


function VideoUpload() {
  const [file, setFile] = useState<File|null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [id, setId] = useState<string>("")
  const router = useRouter()
  // MAX FILE SIZE OF 80MB
  const MAX_FILE_SIZE = 80 * 1024 * 1024
  const getUserId = async () => {
    const response = await axios.get("/api/get-token")
    if(!response.data.success){
      toast.error("Failed to upload")
    }
    setId(response.data.decodedToken.id)
  };
  useEffect(() => {
    getUserId(); // Call the async function inside useEffect
  }, );
  const handleSubmit = async(event:React.FormEvent)=>{
    event.preventDefault()
    if(!file) return alert("Please select a file")
    if(file.size > MAX_FILE_SIZE) return alert("File size is too large")
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('originalSize',file.size.toString())
    formData.append('userId',id)

    try {
      const response = await axios.post('/api/video-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if(!response){
        throw new Error("failed to upload video")
      }
      console.log(response.data)
      router.push('/home')
      setFile(null)
      setTitle("")
      setDescription("")
    } catch (error) {
      console.error(error)
    }finally{
      setIsUploading(false)
    }
  }
  return (
    <div className="container mx-auto p-4 dark:bg-black">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full bg-blue-100 border-black border-[3px] text-black"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full bg-blue-100 text-black"
          />
        </div>
        <div className='form-control'>
          <label className="label">
            <span className="label-text">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered text-black file-input-primary w-full bg-blue-50"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button  className='btn btn-primary ml-3' >Get Code</button>
          </DialogTrigger>
          <DialogContent className="w-full h-full max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className='w-full h-full flex items-center justify-center text-white'>
              <DialogTitle>Code Snippet</DialogTitle>
            </div>
            <div className="w-full h-full max-h-[600px] overflow-auto">
            <CodeEditor generatedCode={`
import {getCldImageUrl,getCldVideoUrl} from "next-cloudinary"

// to get the thumbnail of video using video's publicId(the id given by cloudinary after saving a video)

const getThumbnailUrl = useCallback((publicId:string)=>{
  return getCldImageUrl({
    src:publicId,
    width: 400, // customize accordingly
    height: 225,
    crop:"fill",
    gravity:"auto", 
    quality:"auto",
    format:"jpg", 
    assetType:"video"
  })
},[])

// get the full video url (which can be used for downloading)

const getFullVideoUrl = useCallback((publicId:string)=>{
  return getCldVideoUrl({
    src:publicId,
    width: 1920,
    height: 1080,
  })
},[])

// to get the ai based preview of video(best part of the video)

const getPreviewVideoUrl = useCallback((publicId:string)=>{
  return getCldVideoUrl({
    src:publicId,
    width: 400,
    height: 225,
    rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
  })
},[])

// use it like this

<video
  src={getPreviewVideoUrl(video.publicId)} // for ai based preview
  autoPlay
  muted
  loop
  className=""
/>
`
}/>
            </div>
            
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}

export default VideoUpload