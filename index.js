"use strict";

let isPlay = false;
let playNum = 0;

const body = document.querySelector('body');
const container = document.querySelector('.container');
const audio = document.querySelector('.audio');
const container_cover = document.querySelector('.container_cover');
const container_player = document.querySelector('.container_player');
const container_player_volume = document.querySelector('.container_player_volume');
const container_player_volume__icon = document.querySelector('.container_player_volume__icon');
const player_volume = document.querySelector('#player_volume');
const container_player_nav = document.querySelector('.container_player_nav');
const container_player_nav__play = document.querySelector('.container_player_nav__play');
const container_player_nav__pause = document.querySelector('.container_player_nav__pause');
const container_player_nav__text = document.querySelector('.container_player_nav__text');
const artistName = document.querySelector('.artist');
const songName = document.querySelector('.song');
const arrow_prev = document.querySelector('.arrow_prev');
const arrow_next = document.querySelector('.arrow_next');
const container_player_progress_time = document.querySelector('.container_player_progress_time');
const timeAll = document.querySelector('.timeAll');
const container_player_progress = document.querySelector('.container_player_progress');
const progress_curr = document.querySelector('.progress_curr');
const timeNow = document.querySelector('.timeNow');

const songs = [
    {
        fileName: 'Beyonce.mp3',
        cover: 'Beyonce.jpg',
        artist: 'Beyonce',
        name: 'Halo'
    },
    {
        fileName: 'Billie_Eilish.mp3',
        cover: 'BillieEilish.jpg',
        artist: 'Billie Eilish',
        name: 'Ocean Eyes'
    },
    {
        fileName: 'Ellie_Goulding.mp3',
        cover: 'EllieGoulding.jpg',
        artist: 'Ellie Goulding',
        name: 'Love Me Like You Do'
    },
    {
        fileName: 'Imagine_Dragons.mp3',
        cover: 'ImagineDragons1.jpg',
        artist: 'Imagine Dragons',
        name: 'Thunder'
    },
    {
        fileName: 'Lady_Gaga.mp3',
        cover: 'LadyGaga.jpg',
        artist: 'Lady Gaga',
        name: 'Just Dance'
    }
]

function loadSong(song) {
    audio.src = `assets/audio/${song.fileName}`;
    body.style.backgroundImage = `url(assets/jpg/${song.cover})`;
    container_cover.style.backgroundImage = `url(assets/jpg/${song.cover})`;
    artistName.innerText = song.artist;
    songName.innerText = song.name;
}
loadSong(songs[playNum]);

function playSong() {
    audio.play();
    isPlay = true;
    container_player_nav__play.classList.toggle('hideBtn');
    container_player_nav__pause.classList.toggle('hideBtn');
    // container_player_nav__play.classList.add('hideBtn');
    // container_player_nav__play.classList.remove('showBtn');
    // container_player_nav__pause.classList.remove('hideBtn');
    // container_player_nav__pause.classList.add('showBtn');
}

function pauseSong() {
    audio.pause();
    isPlay = false;
    container_player_nav__play.classList.toggle('hideBtn');
    container_player_nav__pause.classList.toggle('hideBtn');
    // container_player_nav__play.classList.remove('hideBtn');
    // container_player_nav__play.classList.add('showBtn');
    // container_player_nav__pause.classList.add('hideBtn');
    // container_player_nav__pause.classList.remove('showBtn');    
}

container_player_nav__play.addEventListener('click', () => {
    isPlay ? pauseSong() : playSong();
})

container_player_nav__pause.addEventListener('click', () => {
    isPlay ? pauseSong() : playSong();
})

// function checkPlayNum(playNum) {
//     if (playNum >= songs.length) {
//         playNum = 0;
//     } else if (playNum < 0) {
//         playNum = (songs.length - 1);
//     }
// }

arrow_next.addEventListener('click', () => {
    playNum ++;
    progress_curr.style.width = 0;
    // checkPlayNum(playNum);
    // console.log(playNum);
    if (playNum >= songs.length) {
        playNum = 0;
    } else if (playNum < 0) {
        playNum = (songs.length - 1);
    }
    loadSong(songs[playNum]);
    isPlay ? audio.play() : audio.pause();
})

arrow_prev.addEventListener('click', () => {
    playNum --;
    progress_curr.style.width = 0;
    // checkPlayNum(playNum);
    // console.log(playNum);
    if (playNum >= songs.length) {
        playNum = 0;
    } else if (playNum < 0) {
        playNum = (songs.length - 1);
    }
    loadSong(songs[playNum]);
    isPlay ? audio.play() : audio.pause();
})

function progressTimeFromEventTimeUpdate(e) {
    return ((e.srcElement.currentTime / e.srcElement.duration) * 100);
}

function changeTimeAll() {
    let min, sec;
    const intMin = Math.floor(audio.duration / 60);
    (intMin < 10) ? (min = '0' + intMin) : (min = intMin);
    const intSec = Math.floor(audio.duration - (intMin * 60));
    (intSec < 10) ? (sec = '0' + intSec) : (sec = intSec);
    timeAll.innerText = min + ':' + sec;
}
audio.addEventListener('canplay', (e) => {
    changeTimeAll();
});

function changeTimeNow(e) {
    let min, sec, currTime;
    currTime = e.srcElement.currentTime;
    if (currTime < 10) {
        timeNow.innerText = '00:0' + Math.floor(currTime);        
    } else if ((currTime >= 10) && (currTime < 60)) {
        timeNow.innerText = '00:' + Math.floor(currTime);
    } else if (currTime > 60) {
        const intMin = Math.floor(currTime / 60);
        (intMin < 10) ? (min = '0' + intMin) : (min = intMin);
        const intSec = Math.floor(currTime - (intMin * 60));
        (intSec < 10) ? (sec = '0' + intSec) : (sec = intSec);
        timeNow.innerText = min + ':' + sec;
    }
}

audio.addEventListener('timeupdate', (e) => {
    progress_curr.style.width = progressTimeFromEventTimeUpdate(e) + '%';
    changeTimeNow(e);
})

function TimeFromEventClickMouse(e) {
    return ((e.offsetX / container_player_progress.clientWidth) * 100)
}

container_player_progress.addEventListener('click', (e) => {
    progress_curr.style.width = TimeFromEventClickMouse(e) + '%';
    audio.currentTime = audio.duration * (TimeFromEventClickMouse(e) / 100);
})

player_volume.addEventListener('input', (e) => {
    audio.volume = Number(e.target.value);
    console.log(audio.volume);
    console.log(e);
})

player_volume.addEventListener('change', (e) => { 
    audio.volume = Number(e.target.value);
    console.log(audio.volume, 2);
    console.log(e);
})