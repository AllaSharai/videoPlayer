var videoArray = [
    {
        name: "video1",
        url: "https://media.w3.org/2010/05/sintel/trailer.mp4"
    },
    {
        name: "video2",
        url: "https://thepaciellogroup.github.io/AT-browser-tests/video/ElephantsDream.mp4"
    },
    {
        name: "video3",
        url: "https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4"
    },
    {
        name: "video4",
        url: "http://www.html5videoplayer.net/videos/toystory.mp4"
    },
	{
        name: "video5",
        url: "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
    }
];

var rowTemplate = '<td>%ID%</td><td>%NAME%</td><td>%URL%</td><td><div class=\"btn-group mr-2\" role=\"group\"> <button type=\"button\" class=\"glyphicon glyphicon-arrow-up btn btn-secondary\"> </button> </div><div class=\"btn-group mr-2\" role=\"group\"> <button type=\"button\" class=\"glyphicon glyphicon-arrow-down btn btn-secondary\"> </button> </div>  </div><div class="btn-group mr-2" role="group"> <button type="button" class="glyphicon glyphicon-remove btn btn-secondary"> </button> </div></td>';

var video = document.getElementById("video");
var currentVideo = 0;
var videoName = document.getElementById("videoName");
videoName.innerText = videoArray[currentVideo].name;
video.onended = next;

var playListTable = document.getElementById("playListTableBody");

createPlayList();

function createPlayList() {
	playListTableBody.innerHTML = "";
    videoArray.forEach(function (value, index) {
        var rowHTML = rowTemplate.replace("%ID%", index+1).replace("%URL%", value.url).replace("%NAME%", value.name);
        var row = document.createElement('tr');
        row.innerHTML = rowHTML;
        playListTable.appendChild(row);
    });
}

function next() {
    currentVideo++;
    if (currentVideo >= videoArray.length) {
        currentVideo = 0;
    }
    videoName.innerText = videoArray[currentVideo].name;
    video.src = videoArray[currentVideo].url;
}

function prev() {
    currentVideo--;
    if (currentVideo < 0) {
        currentVideo = videoArray.length - 1;
    }
    videoName.innerText = videoArray[currentVideo].name;
    video.src = videoArray[currentVideo].url;
}

function add() {
    let nameInput = document.getElementById("nameInput");
    console.log(nameInput);
    let urlInput = document.getElementById("urlInput");
	var nameText = nameInput.value;
    var urlText = urlInput.value;
    var obj = {
        name: nameText,
        url: urlText
    };
    videoArray.push(obj);
    createPlayList();
    nameInput.value = "";
    urlInput.value = "";

}
