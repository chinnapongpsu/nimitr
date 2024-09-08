import path from 'path'
import config from 'config'

export const buildHtml = (contentData: any) => {
  const assetsPath = `/../assets/`
  const icoPic = path.join(assetsPath, 'favicon.ico')
  const style = path.join(assetsPath, 'styles.css')
  const arscript = path.join(assetsPath, 'arscript.js')
  const frontend = config.get('frontend.frontend_app_domain')

  const assetHtml = contentData
    .filter((content: { mediadata: any }) => {
      const mediaData = content?.mediadata
      return (
        mediaData && (mediaData.type === 'video' || mediaData.type === 'modal')
      )
    })
    .map(
      (content: {
        mediadata: {
          [x: string]: string
          mediaUrl: any
          _id: any
        }
      }) => {
        const mediaData = content?.mediadata
        const mediaUrl = content?.mediadata?.mediaUrl

        let html = ''

        if (mediaData.type === 'video') {
          html += `
        <video 
          preload="none" 
          id="v${content?.mediadata?._id}" 
          response-type="arraybuffer" 
          loop="false" 
          crossorigin 
          webkit-playsinline 
          playsinline 
          controls
          src="${mediaUrl}"
        >
        </video>
      `
        }

        if (mediaData.type === 'modal') {
          html += `
          <a-asset-item 
          id="m${content?.mediadata?._id}" 
          src="${mediaUrl}"
        ></a-asset-item>
      `
        }

        return html
      }
    )
    .join('')

  const contentHtml = contentData
    .filter(
      (content: { markerdata: { markerPattern: any; markerType: string } }) => {
        const isBarcode =
          content?.markerdata?.markerPattern &&
          content?.markerdata?.markerType == 'barcode'
        const isNft =
          content?.markerdata?.markerPattern &&
          content?.markerdata?.markerType == 'nft'
        return isBarcode || isNft
      }
    )
    .map(
      (content: {
        _id: any
        markerdata: {
          markerPattern: any
          markerType: string
          markerNo: any
          name: any
        }
        mediadata: { mediaUrl: any; soundURL: any; type: string; _id: any }
        scale: number
        rotationX: any
        rotationY: any
        rotationZ: any
      }) => {
        const isNft =
          content?.markerdata?.markerPattern &&
          content?.markerdata?.markerType == 'nft'
        const mediaUrl = content?.mediadata?.mediaUrl
        const soundUrl = content?.mediadata?.soundURL

        let scale = content?.scale
        let position = '0 0 0'

        if (isNft) {
          scale = content?.scale * 100
          position = '0 0 0'
        }

        const isModal = content?.mediadata?.type == 'modal' && mediaUrl
        const isVideo = content?.mediadata?.type == 'video'
        const isEmbedded = content?.mediadata?.type == 'embedded'

        const audioHtml = soundUrl
          ? `<audio id="audio_${content?.mediadata?._id}" src="${soundUrl}" loop></audio>`
          : ''

        const markerType = isNft ? 'nft' : 'marker'
        const markerTypeIN = isNft ? 'nft' : 'barcode'
        const markerValueAttr = isNft
          ? `url="${content?.markerdata?.markerPattern}"`
          : `value="${content?.markerdata?.markerNo}"`
        const videoVidhandlerAttr = isVideo
          ? `video-vidhandler="videoId: #v${content?.mediadata?._id};"`
          : ''

        const clickableAttr = soundUrl
          ? `clickable="sound: #audio_${content?.mediadata?._id}; events: click"`
          : ''

        let mediaElementHtml = ''
        if (isVideo) {
          mediaElementHtml = `
          <a-entity position="${position}"  
          rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
          gesture-handler
          scale="${scale} ${scale} 0"
          >
          <a-plane
            material="transparent:true; src:#v${content?.mediadata?._id}"
            width="${scale}"
            height="${scale}"
          />
          <a-text
            value="Click anywhere to play"
            align="center"
            position="0 ${scale * 1.1} 0"
          />
        </a-entity>
      `
        } else if (isModal) {
          mediaElementHtml = `
        <a-entity
          position="${position}"
          rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
          scale="${scale} ${scale} ${scale}"
          gltf-model="#m${content?.mediadata?._id}"
          gesture-handler
          animation-mixer
          ${clickableAttr}
        >
          ${audioHtml}
        </a-entity>
      `
        } else if (isEmbedded) {
          mediaElementHtml = ``
        }

        return `
    <a-${markerType}
    name="${content?.markerdata?.name}"
    type="${markerTypeIN}"
    ${markerValueAttr}
    registerevents
    id="${content?.mediadata?._id}"
    tracking="${content?._id}"
    emitevents="true"
    ${videoVidhandlerAttr}
  >
        ${mediaElementHtml}
      </a-${markerType}>
    `
      }
    )
    .join('')

  const contentStillHtml = contentData
    .filter(
      (content: { markerdata: { markerPattern: any; markerType: string } }) => {
        const isBarcode =
          content?.markerdata?.markerPattern &&
          content?.markerdata?.markerType == 'barcode'
        const isNft =
          content?.markerdata?.markerPattern &&
          content?.markerdata?.markerType == 'nft'
        return isBarcode || isNft
      }
    )
    .map(
      (content: {
        markerdata: {
          markerPattern: any
          markerType: string
          markerNo: any
          name: any
        }
        mediadata: {
          mediaUrl: any
          soundURL: any
          type: string
          _id: any
          still: boolean
        }
        scale: number
        rotationX: any
        rotationY: any
        rotationZ: any
      }) => {
        const isNft =
          content?.markerdata?.markerPattern &&
          content?.markerdata?.markerType == 'nft'
        const mediaUrl = content?.mediadata?.mediaUrl
        const soundUrl = content?.mediadata?.soundURL

        let scale = content?.scale
        let position = '0 0 0'

        if (isNft) {
          scale = content?.scale * 100
          position = '0 0 0'
        }

        const isModal =
          content?.mediadata?.type == 'modal' &&
          mediaUrl &&
          content?.mediadata?.still === true
        const isVideo =
          content?.mediadata?.type == 'video' &&
          content?.mediadata?.still === true
        const isEmbedded =
          content?.mediadata?.type == 'embedded' &&
          content?.mediadata?.still === true

        const audioHtml = soundUrl
          ? `<audio id="audio_${content?.mediadata?._id}" src="${soundUrl}" loop></audio>`
          : ''
        const clickableAttr = soundUrl
          ? `clickable="sound: #audio_${content?.mediadata?._id}; events: click"`
          : ''

        let mediaElementHtml = ''
        if (isVideo) {
          mediaElementHtml = `
          <a-entity 
          id="still${content?.mediadata?._id}"
          position="${position}"  
          visible="false"
          gesture-handler
          scale="${scale} ${scale} 0"
          >
            <a-plane
              material="transparent:true; src:#v${content?.mediadata?._id}"
              width="${scale}"
              height="${scale}"/>
          </a-entity>
        `
        } else if (isModal) {
          mediaElementHtml = `
          <a-entity
            id="still${content?.mediadata?._id}"
            position="${position}"
            rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
            scale="${scale} ${scale} ${scale}"
            gltf-model="#m${content?.mediadata?._id}"
            gesture-handler
            animation-mixer
            ${clickableAttr}
            visible="false"
          >
            ${audioHtml}
          </a-entity>
        `
        }else if (isEmbedded) {
          mediaElementHtml = `
          <div id="still${content?.mediadata?._id}" class="pdfview">
          ${content?.mediadata?.mediaUrl}
          </div>
          `
        }
        return mediaElementHtml
      }
    )
    .join('')
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Nimit AR</title>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge;">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no,user-scalable=no,minimal-ui,viewport-fit=cover">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <!-- External stylesheets and scripts -->
      <link rel="stylesheet" href="${style}">
      <link rel="icon" href="${icoPic}" />
      <script type="module" src="${arscript}"></script>
      <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>  
      <script src="https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@7.0.0/dist/aframe-extras.min.js"></script>
      <script src="https://rawgit.com/mayognaise/aframe-mouse-cursor-component/master/dist/aframe-mouse-cursor-component.min.js"></script>
    </head>
    <body>

    <!-- Add a button element to your HTML -->
    <button id="hideStillButton">
      Hide Still Entity
    </button>

    <!-- AR Scene -->
    <a-scene
      embedded
      vr-mode-ui="enabled: false;"
      arjs='
            trackingMethod: best;
            sourceType:     webcam; 
            debugUIEnabled: false; 
            detectionMode:  mono_and_matrix; 
            matrixCodeType: 3x3; 
            '
      renderer="logarithmicDepthBuffer: true;"
      gesture-detector
      loaded="onSceneLoaded"
      buttonclick
      loading-screen="enabled:false;"
    >

      <div class="arjs-loader">
        <div>Loading, please wait...</div>
      </div>
    
      <a-assets>
      ${assetHtml}
      </a-assets>

      ${contentStillHtml}
      ${contentHtml}
      <!-- Camera entity for user perspective and interaction -->



      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      </a-scene>

    <!-- Monitor for displaying content when no AR markers are detected -->
    <div id="monitor">
      <div class="screen">
      </div>
    </div>
    
    <!-- Loading finished confirmation dialog -->
    <div id="loading-finished-dialog">
      <!-- Dialog content -->
      <div>
        <img src="https://ssouth.azurewebsites.net/wp-content/uploads/2023/04/ss_logo.png" alt="Logo">
        <h1>Loading finished!</h1>
        <h2>Please click anywhere to play</h2>
        <button type="button" id="ok-button">START TRACKING</button>
        </div>
    </div>


    <div id="Pleaseupgrade">
      <div>
        <h1>Please upgrade your plan to unlock..</h1>
          <button type="button" 
          onclick="window.location.href = '${frontend}/payment/'"
          id="ok-button">Upgrade Now</button>
        </div>
    </div>

    </body>
    </html>
  `
}
