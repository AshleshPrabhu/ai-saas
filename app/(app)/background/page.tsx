"use client"
import React,{useState,useEffect,useRef} from 'react'
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import { toast } from 'sonner';

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
    "Remove Background":"removeBackground",
    "Color Background":"removeBackground background=`blueviolet`",
    "Image Background":"removeBackground underlay=`Your Public ID`",
    "Crop Background" : 
        `crop={{
        type: 'crop',
        width: 400,
        height: 400,
        x: 80,
        y: 350,
        gravity: 'north_east',
        source: true
    }}`,
    "Ai Fill":"fillBackground",
    "Recolor":`recolor={['<Object>', '<Color>']}`,
    "Ai Object Remove":`
        remove={{
            prompt: '<Object>',
            removeShadow: true
        }}
    `,
    "Ai Object Replace":`replace={['turtle', 'shark']}`,
    "Ai replace BackGround":`replaceBackground="<Prompt>"`,
    "Ai restore":`restore`,

}
const premium =["Remove Background","Color Background"]

type SocialFormat = keyof typeof socialFormats
type BgFormat = keyof typeof bgOptions


function SocialShare() {
const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)")
const [bgFormat, setBgFormat] = useState<BgFormat>("Remove Background")
const [uploadedImage, setUploadedImage] = useState<string|null>(null)
const [isUploading, setIsUploading] = useState(false)
const [isTransforming, setIsTransforming] = useState(false)
const imageRef = useRef<HTMLImageElement>(null);
const [result, setResult] = useState(false)
const [id, setId] = useState<string>("")
useEffect(()=>{
    if(uploadedImage){
        setIsTransforming(true)
        handleChange()
    }
},[uploadedImage,selectedFormat]) 
const getUserId = async () => {
    const response = await axios.get("/api/get-token");
    if (!response.data.success) {
        toast.error("Failed to upload");
    }
    setId(response.data.decodedToken.id);
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
const handleChange=()=>{
    console.log(bgFormat)
    if(premium.includes(bgFormat.trim())){
        alert("This is a premium feature , you cant access the feature but can access code for free")
        return
    }
    setResult(true)
}

return (
    <div className="container mx-auto p-4 max-w-4xl">
    <h1 className="text-3xl font-bold mb-6 text-center">
        Background changer for social media
    </h1>

    <div className="card">
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
                onChange={(e) =>
                    setBgFormat(e.target.value as BgFormat)
                }
                >
                {Object.keys(bgOptions).map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </div>
            <div className="card-actions mt-6 w-full flex justify-center">
                <button className="btn btn-primary" onClick={handleChange}>
                    Apply changes 
                </button>
            </div>
            <div className="card-actions justify-center flex w-full mt-6">
                <button className="btn btn-primary" onClick={handleDownload}>
                    Get Code
                </button>
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
                            crop="fill"  
                            // overlays={[{
                            //     publicId: uploadedImage,
                            //     effects: [
                            //       {
                            //         crop: 'fill',
                            //         gravity: 'auto',
                            //         width: '1.0',
                            //         height: '1.0',
                            //       }
                            //     ],
                            //     flags: ['relative'],
                            //     appliedEffects: [
                            //       {
                            //         multiply: true
                            //       }
                            //     ]
                            //   }]}
                            aspectRatio={socialFormats[selectedFormat].aspectRatio}
                            replace={['human', 'shark']}
                            // crop={{
                            //     type: 'crop',
                            //     width: 400,
                            //     height: 400,
                            //     x: 80,
                            //     y: 350,
                            //     gravity: 'north_east',
                            //     source: true
                            //   }}
                            gravity='auto'
                            ref={imageRef}
                            fillBackground
                            onLoad={() => setIsTransforming(false)}
                            onError={()=>handleError}
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
                result && (
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

export default SocialShare