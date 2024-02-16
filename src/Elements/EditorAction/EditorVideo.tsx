import { useRef } from "react";


// import ReactPlayer from "react-player"
const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
export default function EditorVideo() {
    const videoElement = useRef<HTMLVideoElement | null>(null);

    return (
        <div className='flex flex-col justify-start items-start gap-y-1'>
            <h3 className="text-lg text-trs-blue-light font-normal">footage.mp4</h3>
            <h3 className="text-sm text-trs-blue font-light">
                Please Note: Transcribed Data is maintained only for 7 days
            </h3>
            <div className="relative">
                <video
                    id="videoJsPlayer"
                    preload="auto"
                    className=""
                    ref={videoElement}
                    // autoPlay
                    controls
                    // onScroll={(e) => console.log(e)}
                    style={{ width: "100%", height: "100%" }}
                    // loop muted
                >
                    <source
                        src={url}
                        type="video/mp4" />
                </video>
                {/* <div className="absolute z-50 bg-teal-800 w-full h-14 bottom-0 opacity-30">
                    
                </div> */}
            </div>
        </div>
    )
}
