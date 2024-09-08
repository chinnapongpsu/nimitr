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

AFRAME.registerComponent("gesture-detector", {
    schema: {
        element: { default: "" },
    },

    init: function () {
        this.targetElement =
            this.data.element && document.querySelector(this.data.element);

        if (!this.targetElement) {
            this.targetElement = this.el;
        }

        this.internalState = {
            previousState: null,
        };

        this.emitGestureEvent = this.emitGestureEvent.bind(this);

        this.targetElement.addEventListener("touchstart", this.emitGestureEvent);

        this.targetElement.addEventListener("touchend", this.emitGestureEvent);

        this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
    },

    remove: function () {
        this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);

        this.targetElement.removeEventListener("touchend", this.emitGestureEvent);

        this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
    },

    emitGestureEvent(event) {
        const currentState = this.getTouchState(event);

        const previousState = this.internalState.previousState;

        const gestureContinues =
            previousState &&
            currentState &&
            currentState.touchCount == previousState.touchCount;

        const gestureEnded = previousState && !gestureContinues;

        const gestureStarted = currentState && !gestureContinues;

        if (gestureEnded) {
            const eventName =
                this.getEventPrefix(previousState.touchCount) + "fingerend";

            this.el.emit(eventName, previousState);

            this.internalState.previousState = null;
        }

        if (gestureStarted) {
            currentState.startTime = performance.now();

            currentState.startPosition = currentState.position;

            currentState.startSpread = currentState.spread;

            const eventName =
                this.getEventPrefix(currentState.touchCount) + "fingerstart";

            this.el.emit(eventName, currentState);

            this.internalState.previousState = currentState;
        }

        if (gestureContinues) {
            const eventDetail = {
                positionChange: {
                    x: currentState.position.x - previousState.position.x,

                    y: currentState.position.y - previousState.position.y,
                },
            };

            if (currentState.spread) {
                eventDetail.spreadChange = currentState.spread - previousState.spread;
            }

            // Update state with new data

            Object.assign(previousState, currentState);

            // Add state data to event detail

            Object.assign(eventDetail, previousState);

            const eventName =
                this.getEventPrefix(currentState.touchCount) + "fingermove";

            this.el.emit(eventName, eventDetail);
        }
    },

    getTouchState: function (event) {
        if (event.touches.length === 0) {
            return null;
        }

        // Convert event.touches to an array so we can use reduce

        const touchList = [];

        for (let i = 0; i < event.touches.length; i++) {
            touchList.push(event.touches[i]);
        }

        const touchState = {
            touchCount: touchList.length,
        };

        // Calculate center of all current touches

        const centerPositionRawX =
            touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
            touchList.length;

        const centerPositionRawY =
            touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
            touchList.length;

        touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };

        // Scale touch position and spread by average of window dimensions

        const screenScale = 2 / (window.innerWidth + window.innerHeight);

        touchState.position = {
            x: centerPositionRawX * screenScale,
            y: centerPositionRawY * screenScale,
        };

        // Calculate average spread of touches from the center point

        if (touchList.length >= 2) {
            const spread =
                touchList.reduce((sum, touch) => {
                    return (
                        sum +
                        Math.sqrt(
                            Math.pow(centerPositionRawX - touch.clientX, 2) +
                            Math.pow(centerPositionRawY - touch.clientY, 2)
                        )
                    );
                }, 0) / touchList.length;

            touchState.spread = spread * screenScale;
        }

        return touchState;
    },

    getEventPrefix(touchCount) {
        const numberNames = ["one", "two", "three", "many"];

        return numberNames[Math.min(touchCount, 4) - 1];
    },
});

AFRAME.registerComponent("gesture-handler", {
    schema: {
        enabled: { default: true },
        rotationFactor: { default: 5 },
        minScale: { default: 0.3 },
        maxScale: { default: 8 },
    },

    init: function () {
        this.handleScale = this.handleScale.bind(this);
        this.handleRotation = this.handleRotation.bind(this);

        this.isVisible = false;
        this.initialScale = this.el.object3D.scale.clone();
        this.scaleFactor = 1;

        this.el.sceneEl.addEventListener("markerFound", (e) => {
            this.isVisible = true;
        });

        this.el.sceneEl.addEventListener("markerLost", (e) => {
            if (hideStillButton.style.display != "none") {
                this.isVisible = true
            } else (
                this.isVisible = false
            )
        });
    },

    update: function () {
        if (this.data.enabled) {
            this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
        } else {
            this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
        }
    },

    remove: function () {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    },

    handleRotation: function (event) {
        if (this.isVisible) {
            this.el.object3D.rotation.y +=
                event.detail.positionChange.x * this.data.rotationFactor;
            this.el.object3D.rotation.x +=
                event.detail.positionChange.y * this.data.rotationFactor;
        }
    },

    handleScale: function (event) {
        if (this.isVisible) {
            this.scaleFactor *=
                1 + event.detail.spreadChange / event.detail.startSpread;

            this.scaleFactor = Math.min(
                Math.max(this.scaleFactor, this.data.minScale),
                this.data.maxScale
            );

            this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }
    },
});

// JavaScript code to remove the loading overlay and display the confirmation dialog once assets are loaded
document.addEventListener("DOMContentLoaded", function () {
    const confirmationDialog = document.getElementById("loading-finished-dialog");
    var loaderDiv = document.querySelector('.arjs-loader');
    const assets = document.querySelectorAll("a-assets");
    const okButton = document.getElementById("ok-button");
    okButton.addEventListener("click", closeConfirmationDialog);

    const checkAssetsLoaded = function () {
        for (const asset of assets) {
            if (!asset.hasLoaded) {
                return false;
            }
        }
        return true;
    };

    const removeLoadingOverlay = function () {
        if (checkAssetsLoaded()) {
            confirmationDialog.style.display = "block";
            loaderDiv.style.display = 'none';
        } else {
            requestAnimationFrame(removeLoadingOverlay);
        }
    };

    removeLoadingOverlay();
});

// Move the closeConfirmationDialog function to the global scope
function closeConfirmationDialog() {
    const confirmationDialog = document.getElementById("loading-finished-dialog");
    confirmationDialog.style.display = "none";
    const monitor = document.getElementById("monitor");
    monitor.style.display = "block";
}

window.addEventListener('load', () => {
    const hideStillButton = document.getElementById('hideStillButton');
    const Pleaseupgrade = document.getElementById('Pleaseupgrade');
    Pleaseupgrade.style.display = "none";
    hideStillButton.style.display = "none";
    let isPlaying = false;
    const ascene = document.querySelector('a-scene');
    let lastFoundMarker = null;
    let video = null;
    let still = null;
    let sound = null;
    let markerstatus = false
    let issoundPlaying = false;
    let embedvideo = null
    const iframes = ascene.querySelectorAll('iframe');

    const reloadiframes = (iframes) => {
        if (iframes) {
            iframes.forEach(iframe => {
                iframe.src = iframe.src
            });
        }
    };
    const pauseallembedvideo = (ascene) => {
        const embedvideos = ascene.querySelectorAll('video');
        if (embedvideos != null) {
            embedvideos.forEach(video => video.pause());
        }
    }

    function getMarkerId(element) {
        return element.getAttribute('id');
    }

    function getElementById(id) {
        return document.getElementById(id);
    }

    async function handleMarkerFound(marker) {
        reloadiframes(iframes)
        console.log(marker.getAttribute('name'), marker.getAttribute('type'));
        hideStillButton.style.display = "none";
        monitor.style.display = "none";
        const markerId = getMarkerId(marker);
        if (markerId) {
            markerstatus = true;
            if (lastFoundMarker && lastFoundMarker !== marker) {
                const previousVideo = getElementById('v' + getMarkerId(lastFoundMarker));
                const previousStill = getElementById('still' + getMarkerId(lastFoundMarker));
                const previousSound = getElementById('audio_' + getMarkerId(lastFoundMarker));
                pauseallembedvideo(ascene)
                if (previousVideo) {
                    previousVideo.pause();
                }
                if (previousSound) {
                    previousSound.pause();
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

            console.log(`Marker found with ID: ${markerId}`);
            video = getElementById('v' + markerId);
            still = getElementById('still' + markerId);
            sound = getElementById('audio_' + markerId);
            if (sound && !sound.paused) {
                sound.pause();
                issoundPlaying = false;
            } else if (sound && sound.paused) {
                sound.play()
                issoundPlaying = true;
            }
            if (video && !video.paused) {
                video.pause();
                isPlaying = false;
            } else if (video && video.paused) {
                video.play()
                isPlaying = true;
            }
            if (still) {
                embedvideo = still.querySelector('video')
                if (embedvideo != null) {
                    embedvideo.style.display = "flex"
                }
                hideStillButton.style.display = "flex";
                still.setAttribute('visible', true);
                still.style.display = "flex";
                still.setAttribute('animation__flyin', {
                    property: 'position',
                    from: '0 -10 -10',
                    to: '0 0 -3',
                    dur: 1000,
                    easing: 'easeOutCubic'
                });
                still.setAttribute('position', '0 0 -3');
            }
            hideStillButton.addEventListener('click', () => {
                if (still) {
                    reloadiframes(iframes)
                    pauseallembedvideo(ascene)
                    markerstatus = false
                    still.setAttribute('visible', false);
                    still.style.display = "none";
                    monitor.style.display = "block";
                    hideStillButton.style.display = "none";
                    lastFoundMarker = null;
                    if (video && !video.paused) {
                        video.pause();
                        isPlaying = false;
                    }
                    if (sound && !sound.paused) {
                        sound.pause();
                        issoundPlaying = false;
                    }
                    still = null;
                    marker = null;
                }
                if (video) {
                    video = null
                }
                if (sound) {
                    sound = null
                }
            });
            var trackingId = marker.getAttribute('tracking');
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
            lastFoundMarker = marker;
        }
    }

    function handleMarkerLost(marker) {
        const markerId = getMarkerId(marker);
        console.log(`Marker lost with ID: ${markerId}`);
        monitor.style.display = "block";

        if (markerId) {
            video = getElementById('v' + markerId);
            sound = getElementById('audio_' + markerId);
            still = getElementById('still' + markerId);
            if (still) {
                monitor.style.display = "none";
                markerstatus = true;
            }
            if (video && !video.paused && !still) {
                video.pause();
                isPlaying = false
                markerstatus = false
            }
            if (sound && !sound.paused && !still) {
                sound.pause();
                issoundPlaying = false
                markerstatus = false
            }
            if (!still) {
                if (video) {
                    video = null
                }
                if (sound) {
                    sound = null
                }
            }
        }
    }

    ascene.addEventListener('markerFound', (event) => {
        const marker = event.target;
        handleMarkerFound(marker);
    });

    ascene.addEventListener('markerLost', (event) => {
        const marker = event.target;
        handleMarkerLost(marker);
    });

    ascene.addEventListener('click', () => {
        if (isPlaying === true && video && markerstatus === true) {
            video.pause();
            isPlaying = false;
        } else if (isPlaying === false && video) {
            video.play()
            isPlaying = true;
        }
        if (issoundPlaying === true && sound && markerstatus === true) {
            sound.pause();
            issoundPlaying = false;
        } else if (issoundPlaying === false && sound) {
            sound.play();
            issoundPlaying = true;
        }
    });
});