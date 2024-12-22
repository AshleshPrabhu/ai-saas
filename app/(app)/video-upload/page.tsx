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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
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
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
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
            <div className='w-full h-full flex items-center justify-center'>
              <DialogTitle>Get code Snippet</DialogTitle>
            </div>
            <div className="w-full h-full max-h-[600px] overflow-auto">
            <CodeEditor generatedCode={`
// A simple JavaScript program to interact with the user
// Declare a variable
let userName = prompt("What's your name?");
// Function to greet the user
function greetUser(name) {
    alert("Hello, " + name + "! Welcome to the site.");
}
// Call the greetUser function
greetUser(userName);
// Create a loop that counts from 1 to 5 and logs the numbers
console.log("Counting from 1 to 5:");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
// Button event listener to change the background color when clicked
document.getElementById("changeColorButton").addEventListener("click", function() {
    document.body.style.backgroundColor = "lightblue";
});`
}/>

            </div>
            
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}

export default VideoUpload