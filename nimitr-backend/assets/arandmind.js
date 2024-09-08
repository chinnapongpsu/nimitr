var arr = []
// Invitation Video Handler
var isSafari = (navigator.userAgent.indexOf("Safari") > -1);
AFRAME.registerComponent("video-vidhandler", {
    schema: {
        element: { default: "" },
        videoId: { default: "" },
    },
    init: function () {
        // console.log("vidint", this.data.videoId, arr, isSafari);
        console.log("Am Safari", isSafari);
        this.vid = this.data.videoId && document.querySelector(this.data.videoId);
        // console.log("vidint", this.vid);
        // this.vid.pause();
    },
    tick: function () {
        if (this.el.object3D.visible == true) {
            if (!this.toggle) {
                this.toggle = true;
                if (!isSafari) {
                    this.vid.play();
                }
                arr.push(this.data.videoId);

            }
        } else {
            this.toggle = false;
            arr = arr.filter(arrayItem => arrayItem !== this.data.videoId);
            // this.vid.pause();
        }
    },
});

// JavaScript code to remove the loading overlay and display the confirmation dialog once assets are loaded
document.addEventListener("DOMContentLoaded", function () {
    const confirmationDialog = document.getElementById("loading-finished-dialog");
    const okButton = document.getElementById("ok-button");
    okButton.addEventListener("click", closeConfirmationDialog);
    confirmationDialog.style.display = "block";
});

// Move the closeConfirmationDialog function to the global scope
function closeConfirmationDialog() {
    const confirmationDialog = document.getElementById("loading-finished-dialog");
    confirmationDialog.style.display = "none";
    const monitor = document.getElementById("monitor");
    monitor.style.display = "block";
}

// Log browser information on page load
window.addEventListener("load", () => {
    const hideStillButton = document.getElementById('hideStillButton');
    hideStillButton.style.display = "none";
    const Pleaseupgrade = document.getElementById('Pleaseupgrade');
    Pleaseupgrade.style.display = "none";
})

let previousStill = null;
let isVideoPlaying = false;
let videoPlayer = null;
let lastFoundMarker = null;
let markerStatus = false;
let soundPlayer = null;
let isSoundPlaying = false;
let embedvideo = null

const ascenes = document.querySelectorAll('a-scene');
const reloadIframes = () => {
    ascenes.forEach(ascene => {
        const iframes = ascene.querySelectorAll('iframe');
        if (iframes.length > 0) {
            iframes.forEach(iframe => {
                iframe.src = iframe.src;
            });
        }
    });
};

const pauseAllEmbedVideo = () => {
    ascenes.forEach(ascene => {
        const embedvideos = ascene.querySelectorAll('video');
        if (embedvideos.length > 0) {
            embedvideos.forEach(video => video.pause());
        }
    });
}

// A-Frame Component to Handle Click and Target Events
AFRAME.registerComponent('mytarget-one', {
    schema: {
        type: { type: 'string', default: 'defaultType' }
    },

    // Initialization function
    init() {
        this.entityId = this.el.id;
        this.entityType = this.data.type;
        this.scene = document.getElementById('a' + this.entityId);
        this.scene.style.display = "none";
        this.scene.addEventListener('click', () => {
            if (isVideoPlaying && videoPlayer && markerStatus) {
                videoPlayer.pause();
                isVideoPlaying = false;
            } else if (!isVideoPlaying && videoPlayer) {
                videoPlayer.play();
                isVideoPlaying = true;
            }
            if (isSoundPlaying && soundPlayer && markerStatus) {
                soundPlayer.pause();
                isSoundPlaying = false;
            } else if (!isSoundPlaying && soundPlayer) {
                soundPlayer.play();
                isSoundPlaying = true;
            }
        });

        this.setupTargetEvents();
    },

    // Method to set up the target event handling
    setupTargetEvents() {
        this.el.addEventListener('targetFound', async () => {
            reloadIframes()
            markerStatus = true;
            hideStillButton.style.display = "none";
            videoPlayer = document.getElementById('va' + this.el.id);
            soundPlayer = document.getElementById('audio_' + this.el.id);
            if (soundPlayer && !soundPlayer.paused) {
                soundPlayer.pause();
                isSoundPlaying = false;
            } else if (soundPlayer && soundPlayer.paused) {
                soundPlayer.play();
                isSoundPlaying = true;
            }
            if (videoPlayer && !videoPlayer.paused) {
                videoPlayer.pause();
                isVideoPlaying = false;
            } else if (videoPlayer && videoPlayer.paused) {
                videoPlayer.play();
                isVideoPlaying = true;
            }

            if (lastFoundMarker && lastFoundMarker !== this.el) {
                const previousVideo = document.getElementById('va' + lastFoundMarker.id);
                const previousSound = document.getElementById('audio_' + lastFoundMarker.id);
                const previoustrackingId = lastFoundMarker.getAttribute('tracking');
                const previousStill = document.getElementById('still' + previoustrackingId);
                pauseAllEmbedVideo()
                if (previousSound) {
                    previousSound.pause();
                }
                if (previousVideo) {
                    previousVideo.pause();
                }
                if (previousStill) {
                    previousStill.setAttribute('animation__flyout', {
                        property: 'position',
                        from: '0 0 -3',
                        to: '0 -10 -10',
                        dur: 1000,
                        easing: 'easeOutCubic'
                    });
                    previousStill.style.display = "none";
                    previousStill.setAttribute('visible', false);
                    monitor.style.display = "block";
                }
            }

            monitor.style.display = "none";
            this.scene.setAttribute('visible', true);
            this.scene.style.display = "block";
            const trackingId = this.el.getAttribute('tracking');
            this.still = document.getElementById('still' + trackingId);

            if (this.still) {
                embedvideo = this.still.querySelector('video')
                if (embedvideo != null) {
                    embedvideo.style.display = "flex"
                }
                hideStillButton.style.display = "flex";
                this.still.setAttribute('visible', true);
                this.still.style.display = "flex";
                this.still.setAttribute('animation__flyin', {
                    property: 'position',
                    from: '0 -10 -10',
                    to: '0 0 -1',
                    dur: 1000,
                    easing: 'easeOutCubic'
                });
                this.still.setAttribute('position', '0 0 -1');
                hideStillButton.addEventListener('click', () => {
                    if (this.still) {
                        reloadIframes()
                        pauseAllEmbedVideo()
                        markerStatus = false;
                        this.still.setAttribute('visible', false);
                        this.still.style.display = "none";
                        monitor.style.display = "block";
                        hideStillButton.style.display = "none";
                        lastFoundMarker = null;
                        if (videoPlayer) {
                            videoPlayer.pause();
                            isVideoPlaying = false;
                            videoPlayer = null;
                        }
                        if (soundPlayer) {
                            soundPlayer.pause();
                            isSoundPlaying = false;
                            soundPlayer = null;
                        }
                    }
                });
                lastFoundMarker = this.el;
            }

            try {
                fetch('/api/updateContent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: trackingId,
                        nowuse: 1,
                    }),
                })
                    .then(async (response) => {
                        if (response.ok) {
                            const jsonResponse = await response.json();
                            console.log('Update successful');
                            const contentStatus = jsonResponse.contentStatus;
                            console.log('Content Status:', contentStatus);
                            switch (contentStatus) {
                                case 'CONTENT_DELETE':
                                    window.location.reload(true);
                                    break;
                                case 'CONTENT_MAXIMUM':
                                case 'CONTENT_LOCK':
                                    Pleaseupgrade.style.display = "block";
                                    break;
                            }
                        } else {
                            console.error('Error updating content');
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating content', error);
                    });
            } catch (error) {
                console.error('Error updating content', error);
            }

            console.log("🎯 Target found for entity with ID:", this.entityId, "and type:", this.entityType);

        });

        this.el.addEventListener('targetLost', () => {
            videoPlayer = document.getElementById('va' + this.el.id);
            soundPlayer = document.getElementById('audio_' + this.el.id);
            monitor.style.display = "block";
            if (videoPlayer && !videoPlayer.paused && !this.still) {
                videoPlayer.pause();
                isVideoPlaying = false;
                markerStatus = false;
            }
            if (soundPlayer && !soundPlayer.paused && !this.still) {
                soundPlayer.pause();
                isSoundPlaying = false;
                markerStatus = false;
            }
            if (this.still) {
                monitor.style.display = "none";
                markerStatus = true;
            } else {
                this.scene.setAttribute('visible', false);
                this.scene.style.display = "none";
            }
            if (!this.still) {
                if (videoPlayer) {
                    videoPlayer = null
                }
                if (soundPlayer) {
                    soundPlayer = null
                }
            }

            console.log("🎯 Target lost for entity with ID:", this.entityId, "and type:", this.entityType);

        });
    },

    // Method to get the entity ID
    getEntityId() {
        return this.entityId;
    },

    // Method to get the entity type
    getEntityType() {
        return this.entityType;
    }
});


// Gesture Detector Component
AFRAME.registerComponent("gesture-detector", {
    schema: {
        element: { default: "" },
    },
    init: function () {
        this.targetElement =
            this.data.element && document.querySelector(this.data.element)

        if (!this.targetElement) {
            this.targetElement = this.el
        }

        this.internalState = {
            previousState: null,
        }

        this.emitGestureEvent = this.emitGestureEvent.bind(this)

        this.targetElement.addEventListener("touchstart", this.emitGestureEvent)
        this.targetElement.addEventListener("touchend", this.emitGestureEvent)
        this.targetElement.addEventListener("touchmove", this.emitGestureEvent)
    },

    remove: function () {
        this.targetElement.removeEventListener("touchstart", this.emitGestureEvent)
        this.targetElement.removeEventListener("touchend", this.emitGestureEvent)
        this.targetElement.removeEventListener("touchmove", this.emitGestureEvent)
    },

    emitGestureEvent(event) {
        const currentState = this.getTouchState(event)
        const previousState = this.internalState.previousState
        const gestureContinues =
            previousState &&
            currentState &&
            currentState.touchCount == previousState.touchCount
        const gestureEnded = previousState && !gestureContinues
        const gestureStarted = currentState && !gestureContinues

        if (gestureEnded) {
            const eventName = this.getEventPrefix(previousState.touchCount) + "fingerend"
            this.el.emit(eventName, previousState)
            this.internalState.previousState = null
        }

        if (gestureStarted) {
            currentState.startTime = performance.now()
            currentState.startPosition = currentState.position
            currentState.startSpread = currentState.spread
            const eventName = this.getEventPrefix(currentState.touchCount) + "fingerstart"
            this.el.emit(eventName, currentState)
            this.internalState.previousState = currentState
        }

        if (gestureContinues) {
            const eventDetail = {
                positionChange: {
                    x: currentState.position.x - previousState.position.x,
                    y: currentState.position.y - previousState.position.y,
                },
            }

            if (currentState.spread) {
                eventDetail.spreadChange = currentState.spread - previousState.spread
            }

            Object.assign(previousState, currentState)
            Object.assign(eventDetail, previousState)

            const eventName = this.getEventPrefix(currentState.touchCount) + "fingermove"
            this.el.emit(eventName, eventDetail)
        }
    },

    getTouchState: function (event) {
        if (event.touches.length === 0) {
            return null
        }
        const touchList = []
        for (let i = 0; i < event.touches.length; i++) {
            touchList.push(event.touches[i]);
        }
        const touchState = {
            touchCount: touchList.length,
        }

        const centerPositionRawX = touchList.reduce((sum, touch) => sum + touch.clientX, 0) / touchList.length
        const centerPositionRawY = touchList.reduce((sum, touch) => sum + touch.clientY, 0) / touchList.length

        touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY }

        const screenScale = 2 / (window.innerWidth + window.innerHeight)

        touchState.position = {
            x: centerPositionRawX * screenScale,
            y: centerPositionRawY * screenScale,
        }

        if (touchList.length >= 2) {
            const spread = touchList.reduce((sum, touch) => {
                return (sum + Math.sqrt(Math.pow(centerPositionRawX - touch.clientX, 2) +
                    Math.pow(centerPositionRawY - touch.clientY, 2)))
            }, 0) / touchList.length

            touchState.spread = spread * screenScale
        }

        return touchState
    },

    getEventPrefix(touchCount) {
        const numberNames = ["one", "two", "three", "many"]
        return numberNames[Math.min(touchCount, 4) - 1]
    },
})

// Gesture Handler Component
AFRAME.registerComponent("gesture-handler", {
    schema: {
        enabled: { default: true },
        rotationFactor: { default: 5 },
        minScale: { default: 0.3 },
        maxScale: { default: 8 },
    },

    init: function () {
        this.handleScale = this.handleScale.bind(this)
        this.handleRotation = this.handleRotation.bind(this)

        this.isVisible = false
        this.initialScale = this.el.object3D.scale.clone()
        this.scaleFactor = 1

        this.el.sceneEl.addEventListener("targetFound", (e) => {
            this.isVisible = true
        })

        this.el.sceneEl.addEventListener("targetLost", (e) => {
            if (hideStillButton.style.display != "none") {
                this.isVisible = true
            } else (
                this.isVisible = false
            )
        })
    },

    update: function () {
        if (this.data.enabled) {
            this.el.sceneEl.addEventListener("onefingermove", this.handleRotation)
            this.el.sceneEl.addEventListener("twofingermove", this.handleScale)
        } else {
            this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation)
            this.el.sceneEl.removeEventListener("twofingermove", this.handleScale)
        }
    },

    remove: function () {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation)
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale)
    },

    handleRotation: function (event) {
        if (this.isVisible) {
            this.el.object3D.rotation.y +=
                event.detail.positionChange.x * this.data.rotationFactor
            this.el.object3D.rotation.x +=
                event.detail.positionChange.y * this.data.rotationFactor
        }
    },

    handleScale: function (event) {
        if (this.isVisible) {
            this.scaleFactor *=
                1 + event.detail.spreadChange / event.detail.startSpread

            this.scaleFactor = Math.min(
                Math.max(this.scaleFactor, this.data.minScale),
                this.data.maxScale
            )

            this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x
            this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y
            this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z
        }
    },
})
