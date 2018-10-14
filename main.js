var videoArray = [
    "https://media.w3.org/2010/05/sintel/trailer.mp4",
    "https://thepaciellogroup.github.io/AT-browser-tests/video/ElephantsDream.mp4",
    "https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4",
    "http://www.html5videoplayer.net/videos/toystory.mp4"
];
var video = document.getElementById("video");
var currentVideo = 0;
var videoName = document.getElementById("videoName");
videoName.innerText = videoArray[currentVideo];

video.onended = next;

function next() {
    currentVideo++;
    if (currentVideo >= videoArray.length) {
        currentVideo = 0;
    }
    videoName.innerText = videoArray[currentVideo];
    video.src = videoArray[currentVideo];
}

function prev() {
    currentVideo--;
    if (currentVideo < 0) {
        currentVideo = videoArray.length - 1;
    }
    videoName.innerText = videoArray[currentVideo];
    video.src = videoArray[currentVideo];
}
