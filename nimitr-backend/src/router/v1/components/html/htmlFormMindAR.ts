import path from 'path'
import config from 'config'

// 📁 Define paths to assets
const assetsPath = `/../assets/`
const icoPic = path.join(assetsPath, 'favicon.ico')
const demomind = path.join(assetsPath, 'StreamSouthTechnology.mind')
const style = path.join(assetsPath, 'styles.css')
const arandmind = path.join(assetsPath, 'arandmind.js')
const frontend = config.get('frontend.frontend_app_domain')

interface ContentData {
  _id: any
  markerdata: { markerPattern: any }
  mediadata: {
    type: any
    soundURL: any
    _id: any
    mediaUrl: any
    still: boolean
  }
  scale: any
  rotationX: any
  rotationY: any
  rotationZ: any
}

// 🏗️ Modularized function to generate a scene element
const generateASceneElement = (
  content: ContentData,
  mediaType: string,
  audioHtml: string,
  clickableAttr: string,
  videoVidhandlerAttr: string,
  stillHtml: string
): string => {
  const assetTag = content?.mediadata?.mediaUrl
    ? mediaType === 'video'
      ? `
            <video 
              preload="none" 
              id="vamarker${content?.mediadata?._id}" 
              response-type="arraybuffer" 
              loop="false" 
              crossorigin="anonymous" 
              webkit-playsinline 
              playsinline 
              controls
              src="${content?.mediadata?.mediaUrl}"
            >
            </video>`
      : mediaType === 'modal'
      ? `
            <a-asset-item 
              id="m${content?.mediadata?._id}" 
              src="${content?.mediadata?.mediaUrl}"
            ></a-asset-item>`
      : mediaType === 'embedded'
      ? ``
      : ``
    : ``
  return `
        <a-scene 
          gesture-detector
          id="amarker${content?.mediadata?._id}" 
          mindar-image="imageTargetSrc: ${
            content?.markerdata?.markerPattern
          };uiError:no;uiScanning:no;"  
          color-space="sRGB" 
          renderer="colorManagement: true, 
          physicallyCorrectLights" 
          vr-mode-ui="enabled: false" 
          device-orientation-permission-ui="enabled: false" 
          buttonclick
          visible="false"
          loading-screen="enabled:false;"
          >
        <a-assets>${assetTag}</a-assets>
        ${stillHtml}
        <a-camera visible="false" position="0 0 0" look-controls="enabled: false"></a-camera>
            <a-entity 
            tracking="${content?._id}"
            id="marker${
              content?.mediadata?._id
            }" mytarget-one="type: ${mediaType}" mindar-image-target="targetIndex: 0" ${videoVidhandlerAttr} >
              ${
                mediaType === 'video'
                  ? `
                  <a-plane
                    scale="${content?.scale} ${content?.scale} ${content?.scale}"
                    height="0.552"
                    width="1"
                    position='0 0.1 0'
                    rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
                    material='transparent:true;src:#vamarker${content?.mediadata?._id}'
                    controls
                  >
                    <a-text
                      scale="${content?.scale} ${content?.scale} ${content?.scale}"
                      value="Click anywhere to play"
                      position='0 0.2 0'
                      rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
                      height="0.552"
                      width="1"
                    ></a-text>
                  </a-plane>`
                  : mediaType === 'modal'
                  ? `
                  <a-entity
                    id="modelmarker${content?.mediadata?._id}"
                    position="0 0 0"
                    rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
                    scale="${content?.scale} ${content?.scale} ${content?.scale}"
                    gltf-model="#m${content?.mediadata?._id}"
                    animation-mixer
                    modify-materials
                    gesture-handler
                    class="clickable"
                    ${clickableAttr}>
                  ${audioHtml}
                  </a-entity>`
                  : mediaType === 'embedded'
                  ? `
                  `
                  : ``
              }
            </a-entity>
          </a-entity>
        </a-scene>`
}

// 🏗️ Modularized function to generate scene HTML
const generateASceneHtml = (contentData: any[], mediaType: string) => {
  return contentData
    .filter(
      ({ markerdata, mediadata }) =>
        markerdata.markerPattern && mediadata.type === mediaType
    )
    .map((content: ContentData) => {
      const { mediadata } = content
      const isVideo = mediadata.type === 'video'
      const soundUrl = mediadata.soundURL
      const still = mediadata.still
      const audioHtml = soundUrl
        ? `
          <audio
            id="audio_marker${mediadata?._id}"
            src="${soundUrl}"
            response-type="arraybuffer"
            loop="false"
            crossorigin="anonymous"
            webkit-playsinline
            playsinline
            controls
          ></audio>`
        : ''

      const clickableAttr = soundUrl
        ? `clickable="sound: #audio_marker${mediadata?._id}; events: click"`
        : ''

      const videoVidhandlerAttr = isVideo
        ? `video-vidhandler="videoId: #vamarker${mediadata?._id};"`
        : ''

      const stillHtml =
        still == true && mediaType != 'embedded'
          ? `
          <a-entity
            id="still${content?._id}"
            visible="true"
            mediadataID="${content?.mediadata?._id}"
            ${videoVidhandlerAttr}
          >
            ${
              mediaType === 'video'
                ? `
                <a-plane
                    scale="${content?.scale} ${content?.scale} ${content?.scale}"
                    height="0.552"
                    width="1"
                    position='0 0.1 0'
                    rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
                    material='transparent:true;src:#vamarker${content?.mediadata?._id}'
                    gesture-handler
                    controls
                  >
                  </a-plane>`
                : mediaType === 'modal'
                ? `
                <a-entity
                id="modelmarker${content?.mediadata?._id}"
                rotation="${content?.rotationX} ${content?.rotationY} ${content?.rotationZ}"
                scale="${content?.scale} ${content?.scale} ${content?.scale}"
                gltf-model="#m${content?.mediadata?._id}"
                animation-mixer
                modify-materials
                gesture-handler
                class="clickable"
                ${clickableAttr}>
              ${audioHtml}
              </a-entity>`
                : ``
            }
          </a-entity>`
          : still == true && mediaType === 'embedded'
          ? `
          <div id="still${content?._id}" 
            visible="true"
            mediadataID="${content?.mediadata?._id}"
            class="pdfviewmindar">
            ${content?.mediadata?.mediaUrl}
          </div>
          `
          : '';          

      return generateASceneElement(
        content,
        mediaType,
        audioHtml,
        clickableAttr,
        videoVidhandlerAttr,
        stillHtml
      )
    })
    .join('')
}

// 🚀 Export the main HTML builder function
export const buildHtmlMindAR =  (contentData: any) => {
  const modalSceneHtml = generateASceneHtml(contentData, 'modal')
  const videoSceneHtml = generateASceneHtml(contentData, 'video')
  const embeddedSceneHtml = generateASceneHtml(contentData, 'embedded')

  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Nimit AR</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
        <link rel="icon" href="${icoPic}" />
        <link rel="stylesheet" href="${style}" />
        <script type="module" src="${arandmind}"></script>
        <script src="https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-aframe.prod.js"></script>
        <script src="https://rawgit.com/allanweir/aframe-touch-rotation-controls/master/dist/aframe-touch-rotation-controls.min.js"></script>
      </head>
      <body>
        <button id="hideStillButton">
          Hide Still Entity
        </button>
        <a-scene 
        mindar-image="imageTargetSrc:${demomind};autoStart:false;uiScanning:no;" 
        color-space="sRGB" 
        renderer="colorManagement: true, 
        physicallyCorrectLights" 
        vr-mode-ui="enabled: false"
        visible="false"
        device-orientation-permission-ui="enabled: false"
        loading-screen="enabled:false;"
        >
        <a-camera visible="false" position="0 0 0" look-controls="enabled: false"></a-camera>
        </a-scene>
        ${modalSceneHtml}
        ${videoSceneHtml}
        ${embeddedSceneHtml}

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
    </html>`
}
