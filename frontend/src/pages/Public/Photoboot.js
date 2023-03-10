import {React, useEffect, useRef} from 'react'
import html2canvas from 'html2canvas'

function Photoboot() {
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const stripRef = useRef(null)
    const productRef = useRef(null)

    const startVideo = () => {
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

    const paintToCanvas = () => {
        let video = videoRef.current
        let photo = photoRef.current 

        let ctx = photo.getContext("2d")

        const width = 320
        const height = 240
        photo.width = width
        photo.height = height

        return setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height)
        }, 1)
    }

    const takePhoto = () => {
        let photo = photoRef.current 
        let strip = stripRef.current 

        const data = photo.toDataURL("image/jpeg")
        const link = document.createElement("a")
        link.href = data 
        link.setAttribute("download", "myWebcam")
        link.innerHTML = `<img src='${data}' alt='thumbnail' />`
        strip.insertBefore(link, strip.firstChild)
    }

    const savePhoto = async () => {
        const product = await productRef.current
        
        await html2canvas(product).then(async(canvas) => {
            const imageUrl = await canvas.toDataURL("image/png", 1.0)
            const fakeLink = await document.createElement("a")
            const printArea = await document.getElementById('print-area')

            canvas.height = 240
            canvas.style.height = "240px"
            
            fakeLink.download = await "myWebcam"
            fakeLink.href = await imageUrl 

            printArea.innerHtml = await fakeLink 
            await fakeLink.click()
            await fakeLink.remove()
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        startVideo()
    }, [])

  return (
    <div>
        <video 
            hidden
            autoPlay={true} 
            id="video-element"
            ref={ videoRef }
            onCanPlay={() => paintToCanvas()}
        ></video>

        <canvas ref={ photoRef } />

        <div>
            <button
                onClick={ () => takePhoto() }>
                Take a Photo
            </button>
        </div>

        <div>
            <button
                onClick={ () => savePhoto() }
                classs={ 'clear' }>
                Save
            </button>
        </div>

        <div ref={ productRef } id='product-container'>
            <div className={ 'frame' } >
                <img src={ "/images/frame-1.png" }  alt="frame" />
            </div>
            <div className={ 'frame-photo' }>
                <div ref={ stripRef }></div>
            </div>
        </div>

        <div id="print-area"></div>

    </div>
  )
}

export default Photoboot