    "use client"
    import React,{useEffect,useState,useCallback} from 'react'
    import axios from 'axios'
    import { Video } from '@/types'
    import VideoCard from '@/components/videoCard'

    function VideoGrid() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string |null>(null)
    const fetchVideos = useCallback(async()=>{
        setLoading(true)
        try {
        const id = await axios.get("/api/get-token")
        const response = await axios.post('/api/user',
            {id:id.data.decodedToken.id||""}
        )
        // console.log(response) 
        if(Array.isArray(response.data.user.videos)){
            setVideos(response.data.user.videos||[])
        }else{
            throw new Error("unexpected response format")
        }
        } catch (error:any) {
        // console.log(error)
        setError(error|| "failed to fetch videos")
        }finally{
        setLoading(false)
        }
        
    },[])
    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])
    const handleDownload = useCallback((url: string, title: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.mp4`);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Videos</h1>
        {videos.length === 0 ? (
            <div className="text-center text-lg text-gray-500 dark:text-white">
            No videos available
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onDownload={handleDownload}
                    />
                ))
            }
            
            </div>
        )}
        </div>
    );
    }

    export default VideoGrid