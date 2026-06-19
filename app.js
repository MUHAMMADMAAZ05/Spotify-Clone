let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
audioElement.preload = "auto";
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let volumeSlider = document.getElementById('volumeSlider');

let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Warriyo - Mortals [NCS Release]", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Cielo - Huma-Huma", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"DEAF KEV - Invincible [NCS Release]", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Different Heaven & EH!DE - My Heart", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Janji-Heroes-Tonight-feat-Johnning", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Royal Salam-e-Ishq", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Salam-e-Ishq", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"}
];

// Load songs in list
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
});

// Play selected song
function playSelectedSong() {
    audioElement.pause();
    audioElement.src = songs[songIndex].filePath;
    audioElement.load();

    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;

    audioElement.play().catch((error) => {
        console.log("Audio play error:", error);
    });

    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
}
// function playSelectedSong() {
//     audioElement.src = songs[songIndex].filePath;
//     masterSongName.innerHTML = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();

//     gif.style.opacity = 1;

//     masterPlay.classList.remove('fa-circle-play');
//     masterPlay.classList.add('fa-pause-circle');
// }

// Master Play/Pause
masterPlay.addEventListener("click", () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');

        gif.style.opacity = 1;

    } else {

        audioElement.pause();

        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');

        gif.style.opacity = 0;
    }
});

// Progress Bar Update
audioElement.addEventListener("timeupdate", () => {

    if (!isNaN(audioElement.duration)) {

        let progress = parseInt(
            (audioElement.currentTime / audioElement.duration) * 100
        );

        myProgressBar.value = progress;
    }
});

// Seek Song
myProgressBar.addEventListener("change", () => {

    if (!isNaN(audioElement.duration)) {

        audioElement.currentTime =
            (myProgressBar.value * audioElement.duration) / 100;
    }
});

// Volume Control
if (volumeSlider) {

    audioElement.volume = 0.8;

    volumeSlider.addEventListener("input", () => {

        audioElement.volume = volumeSlider.value / 100;
    });
}

// Reset all playlist icons
const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    });
};

// Playlist Play Buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

    element.addEventListener('click', (e) => {

        makeAllPlays();

        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause-circle');

        playSelectedSong();
    });
});

// Next Button
document.getElementById('next').addEventListener("click", () => {

    songIndex = (songIndex + 1) % songs.length;

    playSelectedSong();
});

// Previous Button
document.getElementById('previous').addEventListener("click", () => {

    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }

    playSelectedSong();
});

// Autoplay Next Song
audioElement.addEventListener("ended", () => {

    songIndex = (songIndex + 1) % songs.length;

    playSelectedSong();
});