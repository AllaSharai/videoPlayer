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
var progressBar = document.getElementById("videoProgress");
var volumeProgress = document.getElementById("videoVolumeProgress");

var playListTable = document.getElementById("playListTableBody");


var slider = document.getElementById("myRange");
var volumeSlider = document.getElementById("volumeSlider");
volumeSlider.value = video.volume * 100;

video.onvolumechange = function(){
    volumeSlider.value = video.volume * 100;
    volumeProgress.value = video.volume * 100;
};

volumeSlider.oninput = function(){
    video.volume = volumeSlider.value / 100;
};

video.ontimeupdate = function () {
    slider.value = video.currentTime * 100 / video.duration;
    progressBar.value = video.currentTime * 100 / video.duration;
};

slider.oninput = function() {
    video.currentTime = slider.value * video.duration / 100;
};


createPlayList();

function createPlayList() {
	playListTableBody.innerHTML = "";
    videoArray.forEach(function (value, index) {
        var rowHTML = rowTemplate.replace("%ID%", index+1).replace("%URL%", value.url).replace("%NAME%", value.name);
        var row = document.createElement('tr');
        if (index === currentVideo) {
            row.classList.add("active")
        }
        row.innerHTML = rowHTML;
        row.children[3].children[0].onclick = up;
        row.children[3].children[1].onclick = down;
        row.children[3].children[2].onclick = deleteRow;
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
    createPlayList();

}

function prev() {
    currentVideo--;
    if (currentVideo < 0) {
        currentVideo = videoArray.length - 1;
    }
    videoName.innerText = videoArray[currentVideo].name;
    video.src = videoArray[currentVideo].url;
    createPlayList();
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

function up(event) {
    let index = event.target.parentElement.parentElement.parentElement.children[0].innerText - 1;
    let index2 = index - 1;
    if (index2 < 0){
        return;
    }
    if (index === currentVideo) {
        currentVideo = index2;
    }
    swap(index, index2);
    createPlayList();

}

function down(event) {
    let index = event.target.parentElement.parentElement.parentElement.children[0].innerText - 1;
    let index2 = index + 1;
    if (index2 > videoArray.length - 1){
        return;
    }
    if (index === currentVideo) {
        currentVideo = index2;
    }
    swap(index, index2);
    createPlayList();
}

function deleteRow(event) {
    let index = event.target.parentElement.parentElement.parentElement.children[0].innerText - 1;
    if (index > -1) {
        videoArray.splice(index, 1);
        if (index === currentVideo) {
            currentVideo -= 1;
            next();
        }
        createPlayList();
    }
}

function swap(index1, index2) {
    let tmp = videoArray[index1];
    videoArray[index1] = videoArray[index2];
    videoArray[index2] = tmp;
}
