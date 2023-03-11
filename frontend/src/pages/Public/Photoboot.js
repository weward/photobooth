import {React, useEffect, useRef} from 'react'
import html2canvas from 'html2canvas'

function Photoboot() {
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const stripRef = useRef(null)
    const productRef = useRef(null)
    const countdownRef = useRef(null)

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

    /** 
     * This iss a hidden 1:1 video mirror
     * This is where a snapshot is taken and 
     * its dataURL is extracted.
     * 
     * */ 
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

    const start = async () => {
        const countdown = countdownRef.current
        const seconds = 3
        const gap = (seconds  * 1000) // every 3 seconds
        
        let count = 0
        let total = 4
        countdown.innerHTML = '1'
        const intervalId = setInterval(() => {
            count++
            countdown.innerHTML = (count % 3) + 1

            if ((count % seconds) == 0) {
                takePhoto()
                total--
            }

            if (total == 0) {
                savePhoto()
                // Stop loop (setInterval)
                clearInterval(intervalId);
                countdown.innerHTML = ''
            }
            
            // count++
        }, 1000)

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

    const printPhoto = async (imageUrl) => {
        try {
            const printWindow = await window.open('', 'PRINT')
            
            await printWindow.document.write(`<img src='${imageUrl}'>`)
            await printWindow.document.close()  // for IE >= 10]
            await printWindow.focus()           // for IE >= 10
            await printWindow.print()
            await printWindow.close()
        } catch (e) {
            console.log(e.stack)
        }
    }

    const savePhoto = async () => {
        const product = await productRef.current
        const canvas = await html2canvas(product)
        const imageUrl = await canvas.toDataURL("image/png", 1.0)
        const fakeLink = await document.createElement("a")
        const printArea = await document.getElementById('print-area')
        const strip = await stripRef.current

        canvas.height = 480
        canvas.style.height = "480px"
        
        fakeLink.download = await "myWebcam"
        fakeLink.href = await imageUrl 

        printArea.innerHtml = await fakeLink 
        // Download
        await fakeLink.click()
        // Print
        await printPhoto(imageUrl)

        await fakeLink.remove()

        strip.innerHTML = await ''
    }

    useEffect(() => {
        startVideo()
    }, [])

  return (
    <div>
        <div class="video-container">
            <video 
                autoPlay={true} 
                id="video-element"
                ref={ videoRef }
                onCanPlay={() => paintToCanvas()}
            ></video>
            <div ref={countdownRef} class="countdown"></div>
        </div>

        <canvas hidden ref={ photoRef } />

        <div>
            <button
                onClick={ () => start() }>
                Start
            </button>
        </div>

        {/* <div>
            <button
                onClick={ () => savePhoto() }
                classs={ 'clear' }>
                Save
            </button>
        </div> */}

        <div ref={ productRef } id='product-container'>
            <div className={ 'frame' } >
                <img src={ "/images/frame-2.png" }  alt="frame" />
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