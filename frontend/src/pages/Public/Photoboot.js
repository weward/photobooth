import {React, useEffect, useRef} from 'react'

function Photoboot() {
    const videoRef = useRef(null);

    const playVideo = () => {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
                .then((stream) => {
                    let video = videoRef.current
                    video.srcObject = stream
                    video.onloadedmetadata = function(e) {
                        video.play();
                    };
                })
                .catch((error) => {
                    console.log("[Webcam Connection Failed]")
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        playVideo()
    }, [])

  return (
    <div>
        <video 
            autoPlay={true} 
            id="video-element"
            // ref={video => {this.video = video}}
            ref={ videoRef }
        ></video>
    </div>
  )
}

export default Photoboot