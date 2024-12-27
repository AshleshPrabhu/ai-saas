"use client"
import React,{useState,useEffect,useRef} from 'react'
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
function getDynamicProps(
    bgFormat: BgFormat,
    object: string = "",
    color: string = "",
    prompt: string = "",
    replace1: string = "",
    replace2: string = ""
) {
    switch (bgFormat) {
        case "Remove Background":
            return { removeBackground: true };
        case "Color Background":
            return { removeBackground: true, background: "blueviolet" };
        case "Image Background":
            return { removeBackground: true, underlay: "Your Public ID" };
        // case "Crop Background":
        //     return {
        //         crop: {
        //             type: "crop", // Ensure this matches the expected literal type
        //             width: 400,
        //             height: 400,
        //             x: 80,
        //             y: 350,
        //             gravity: "north_east",
        //             source: true,
        //         },
        //     };
        case "Ai Fill":
            return { fillBackground: true };
        case "Recolor":
            return { recolor: [object,color] };
        case "Ai Object Remove":
            return {
                remove: {
                    prompt: object,
                },
            };
        case "Ai Object Replace":
            return { replace: [replace1, replace2] };
        case "Ai replace BackGround":
            return { replaceBackground: prompt };
        case "Ai restore":
            return { restore: true };
        default:
            return {};
    }
}



const socialFormats = {
"Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
"Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
"Instagram Landscape (1.91:1)": { width: 1080, height: 566, aspectRatio: "1.91:1" },
"Instagram Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
"Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
"Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
"Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
"Facebook Post (1:1)": { width: 1200, height: 1200, aspectRatio: "1:1" },
"Facebook Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
"YouTube Thumbnail (16:9)": { width: 1280, height: 720, aspectRatio: "16:9" },
"YouTube Channel Cover (2560:1440)": { width: 2560, height: 1440, aspectRatio: "16:9" },
"Pinterest Pin (2:3)": { width: 1000, height: 1500, aspectRatio: "2:3" },
"LinkedIn Post (1.91:1)": { width: 1200, height: 628, aspectRatio: "1.91:1" },
"LinkedIn Cover (4:1)": { width: 1584, height: 396, aspectRatio: "4:1" },
"Snapchat Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
"TikTok Video (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
"Twitch Profile Banner (120:48)": { width: 1200, height: 480, aspectRatio: "120:48" },
"Twitch Offline Screen (16:9)": { width: 1920, height: 1080, aspectRatio: "16:9" },
};

const bgOptions={
    "Remove Background":"",
    "Color Background":"",
    "Image Background":"",
    "Crop Background" : "",
    "Ai Fill":"",
    "Recolor":"",
    "Ai Object Remove":"",
    "Ai Object Replace":"",
    "Ai replace BackGround":"",
    "Ai restore":"",

}
const premium =["Remove Background","Color Background","Image Background"]
const valueArray =["Recolor","Ai Object Remove","Ai Object Replace","Ai replace BackGround"]

type SocialFormat = keyof typeof socialFormats
type BgFormat = keyof typeof bgOptions
interface User {
    email:string   
    name:string
    videos: object
    isPaid:boolean
    order:{
        plan:string
    }
}

function Background() {
const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)")
const [bgFormat, setBgFormat] = useState<BgFormat>("Ai Fill")
const [uploadedImage, setUploadedImage] = useState<string|null>(null)
const [isUploading, setIsUploading] = useState(false)
const [isTransforming, setIsTransforming] = useState(false)
const imageRef = useRef<HTMLImageElement>(null);
const [result, setResult] = useState(false)
const [id, setId] = useState<string>("")
const [object, setObject] = useState<string>("")
const [color, setColor] = useState<string>("")
const [prompt, setPrompt] = useState<string>("")
const [replace1, setReplace1] = useState<string>("")
const [replace2, setReplace2] = useState<string>("")
const [user, setUser] = useState<User>()
const [show, setShow] = useState(false)
const getUserId = async () => {
    const response = await axios.get("/api/get-token");
    if (!response.data.success) {
        toast.error("Failed to upload");
        return;
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
    console.log([...formData.entries()]);
    try {
        const response = await axios.post("/api/image-upload", formData);
        console.log(response);
        if (!response.data.success) {
            throw new Error("failed to upload the image");
        }
        setUploadedImage(response.data.publicId);
    } catch (error) {
        console.log("err in uploading",error)
        toast.error("failed to upload image")
    }finally{
        setIsUploading(false)
    }
}

const handleDownload =()=>{
    if(!imageRef.current) return
    // url ->binary obj ->create a url from it
    fetch(imageRef.current.src)
    .then(res=>res.blob())
    .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFormat.replace(/\s+/g,"_").toLowerCase()}.png`;
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a); 
    })
}
const handleError = (error:any) => {
    console.error('Image transformation error:', error);
};
const handleChange=async()=>{
    console.log(bgFormat)
    if(premium.includes(bgFormat.trim())){
        alert("This is a premium feature , you cant access the feature but can access code for free")
        return
    }
    if(user?.isPaid){
        const res = await axios.post("/api/add-image",{userId:id,img:imageRef.current?.src})
        if(!res.data.success){
            toast.error("Failed to add image")
        }
    }
    setResult(true)
    setIsTransforming(true)
}
const handleClick=()=>{
    setShow(true)
}

return (
    <div className="container mx-auto p-4 max-w-4xl">
    <h1 className="text-3xl font-bold mb-6 text-center">
        Background changer for social media
    </h1>

    <div className="card bg-blue-100">
        <div className="card-body">
        <h2 className="card-title mb-4">Upload an Image</h2>
        <div className="form-control">
            <label className="label">
            <span className="label-text">Choose an image file</span>
            </label>
            <input
            type="file"
            onChange={handleFileUpload}
            className="file-input file-input-bordered file-input-primary w-full"
            />
        </div>
        

        {isUploading && (
            <div className="mt-4">
            <progress className="progress progress-primary w-full"></progress>
            </div>
        )}

        {uploadedImage && (
            <div className="mt-6">
            <h2 className="card-title mb-4">Select Social Media Format</h2>
            <div className="form-control">
                <select
                className="select select-bordered w-full"
                value={selectedFormat}
                onChange={(e) =>{
                    setSelectedFormat(e.target.value as SocialFormat)
                    setShow(false)
                    setResult(false)
                }
                }
                >
                {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                    {format}
                    </option>
                ))}
                </select>
            </div>

            <h2 className="card-title mb-4">Add individual effect</h2>
            <div className="form-control">
                <select
                className="select select-bordered w-full"
                value={bgFormat}
                onChange={(e) =>{
                    setBgFormat(e.target.value as BgFormat)
                    setShow(false)
                    setResult(false)
                }}
                >
                {Object.keys(bgOptions).map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </div>
            {
                !valueArray.includes(bgFormat) && (
                    <div className="card-actions mt-6 w-full flex justify-center">
                        <button className="btn btn-primary" onClick={handleChange}>
                            Apply changes 
                        </button>
                    </div>
                )
            }
            {
                bgFormat==="Ai replace BackGround" && (
                    <div className="card-actions mt-6 w-full flex justify-center items-center">
                        <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='enter prompt to replace'
                        className='rounded-lg '
                        />
                        <Button onClick={handleClick}>
                            Enter
                        </Button>
                    </div>
                )
            }
            {
                bgFormat==="Ai Object Remove" && (
                    <div className="card-actions mt-6 w-full flex justify-center items-center">
                        <Input
                        value={object}
                        onChange={(e) => setObject(e.target.value)}
                        placeholder='enter object to remove'
                        className='rounded-lg '
                        />
                        <Button onClick={handleClick}>
                            Enter
                        </Button>
                    </div>
                )
            }
            {
                bgFormat==="Recolor" && (
                    <div className="card-actions mt-6 w-full flex justify-center items-center">
                        <Input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder='enter color'
                        className='rounded-lg '
                        />
                        <Input
                        value={object}
                        onChange={(e) => setObject(e.target.value)}
                        placeholder='enter object to color'
                        className='rounded-lg '
                        />
                        <Button onClick={handleClick}>
                            Enter
                        </Button>
                    </div>
                )
            }
            {
                bgFormat==="Ai Object Replace" && (
                    <div className="card-actions mt-6 w-full flex justify-center items-center">
                        <Input
                        value={replace1}
                        onChange={(e) => setReplace1(e.target.value)}
                        placeholder='replace what ?'
                        className='rounded-lg '
                        />
                        <Input
                        value={replace2}
                        onChange={(e) => setReplace2(e.target.value)}
                        placeholder='replace with'
                        className='rounded-lg '
                        />
                        <Button onClick={handleClick}>
                            Enter
                        </Button>
                    </div>
                )
            }
            {
                show && (
                    <div className="card-actions mt-6 w-full flex justify-center">
                        <button className="btn btn-primary" onClick={handleChange}>
                            Apply changes 
                        </button>
                    </div>
                )
            }


            <div className="card-actions justify-center flex w-full mt-6">
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
// bgFormat is the state defined to hold the choice choosen by user
const [bgFormat, setBgFormat] = useState<BgFormat>("Ai Fill")
// BgFormat is object (keys=> different methods ,values=>"")
<CldImage
    width={socialFormats[selectedFormat].width}
    height={socialFormats[selectedFormat].height}
    src={uploadedImage} // url returned from cloudinary
    sizes="100vw"
    alt="transformed image"
    aspectRatio={socialFormats[selectedFormat].aspectRatio}
    ref={imageRef}
    fillBackground={bgFormat === "Ai Fill"} // Apply 'fillBackground' when bgFormat is "Ai Fill"
    replace={bgFormat === "Ai Object Replace" ? ['what to replace', 'with what to replace'] : undefined} // Apply 'replace' when bgFormat is "Ai Object Replace"
    removeBackground={bgFormat === "Ai Object Remove" || bgFormat === "Remove Background"} // Apply 'removeBackground' when bgFormat is "Ai Object Remove"
    recolor={bgFormat === "Ai Recolor" ? ["blue", "red"] : undefined} // Example of applying recolor
    remove={bgFormat === "Ai Object Remove" ? { prompt: "object", removeShadow: true } : undefined} // Remove background
    crop={bgFormat === "Crop" ? { type: "crop", width: 100, height: 100, x: 0, y: 0, gravity: "auto", source: true } : undefined} // Example of applying crop
    onLoad={() => setIsTransforming(false)}
    onError={handleError}
/>
`
}/>
                </div>
                
                </DialogContent>
                </Dialog>
            </div>

            <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <div className="flex justify-center">
                {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                    <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
                {
                    result ? (
                        <CldImage
                            width={socialFormats[selectedFormat].width}
                            height={socialFormats[selectedFormat].height}
                            src={uploadedImage}
                            sizes="100vw"
                            alt="transformed image"
                            aspectRatio={socialFormats[selectedFormat].aspectRatio}
                            ref={imageRef}
                            // gravity="auto"
                            // fillBackground={bgFormat === "Ai Fill"}
                            // replace={bgFormat === "Ai Object Replace" ? [replace1, replace2] : undefined}
                            {...getDynamicProps(bgFormat,object,color,prompt,replace1,replace2)} // Dynamically apply other props
                            onLoad={() => setIsTransforming(false)}
                            onError={handleError}
                        />

                    ):(
                        <div className='w-full text-3xl font-bold'>
                            Apply changes to see the image Preview
                        </div>
                    )
                }
                </div>
            </div>

            {
                result && !isTransforming && (
                    <div className="card-actions justify-end mt-6">
                        <button className="btn btn-primary" onClick={handleDownload}>
                            Download for {selectedFormat}
                        </button>
                    </div>
                )
            }
            </div>
        )}
        </div>
    </div>
    </div>
);
}

export default Background