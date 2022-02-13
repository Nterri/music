const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.header__menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });
};
$(document).ready(function () {
    $('.slider').slick({
        slidesToShow: 3,
        waitForAnimate: false,
        autoplay: true,
        variableWidth: true
    });
});
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__container').offsetHeight;
            if (iconMenu.classList.contains('active')) {
                document.body.classList.remove('lock');
                iconMenu.classList.remove('active');
                menuBody.classList.remove('active');
            }
            console.log(gotoBlockValue);
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    }
};

const player1 = document.querySelector('.start__audio1');
const playBtn1 = document.querySelector('.player-btn1');
const audio1 = document.querySelector('.audio1');
const progressCon1 = document.querySelector('.progress__container1');
const progress1 = document.querySelector('.progress1');
const progressStick1 = document.querySelector('.progressStick1');
const time1 = document.querySelector('.time1');
playBtn1.addEventListener('click', () => {
    const isPlaying = player1.classList.contains('playSong');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
        pauseSong2();
    }
});
audio1.addEventListener('timeupdate', updateProgress);
progressCon1.addEventListener('click', setProgress);
audio1.addEventListener('ended', end)
function playSong() {
    player1.classList.add('playSong');
    playBtn1.classList.remove('play');
    playBtn1.classList.add('stop');
    audio1.play();
}
function pauseSong() {
    player1.classList.remove('playSong');
    playBtn1.classList.remove('stop');
    playBtn1.classList.add('play');
    audio1.pause();
}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress1.style.width = `${progressPercent}%`;
    progressStick1.style.left = `${progressPercent}%`;
    const minutes = Math.round(duration) - Math.floor(Math.round(duration) / 60) * 60;
    let addZero;
    if (Math.round(currentTime) % 60 < 10) {
        addZero = '0';
    } else {
        addZero = '';
    }
    time1.innerHTML = `0${Math.floor(Math.round(currentTime) / 60)}:${addZero}${Math.round(currentTime) % 60}-0${Math.floor(Math.round(duration) / 60)}:${minutes}`;
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio1.duration;
    audio1.currentTime = (clickX / width) * duration;
}
function end() {
    audio1.currentTime = 0;
    player1.classList.remove('playSong');
    playBtn1.classList.remove('stop');
    playBtn1.classList.add('play');
    audio1.pause();
}

const player2 = document.querySelector('.start__audio2');
const playBtn2 = document.querySelector('.player-btn2');
const audio2 = document.querySelector('.audio2');
const progressCon2 = document.querySelector('.progress__container2');
const progress2 = document.querySelector('.progress2');
const progressStick2 = document.querySelector('.progressStick2');
const time2 = document.querySelector('.time2');
playBtn2.addEventListener('click', () => {
    const isPlaying = player2.classList.contains('playSong');
    if (isPlaying) {
        pauseSong2();
    } else {
        playSong2();
        pauseSong();
    }
});
audio2.addEventListener('timeupdate', updateProgress2);
progressCon2.addEventListener('click', setProgress2);
audio2.addEventListener('ended', end2)
function playSong2() {
    player2.classList.add('playSong');
    playBtn2.classList.remove('play');
    playBtn2.classList.add('stop');
    audio2.play();
}
function pauseSong2() {
    player2.classList.remove('playSong');
    playBtn2.classList.remove('stop');
    playBtn2.classList.add('play');
    audio2.pause();
}
function updateProgress2(e) {
    const duration = audio2.duration;
    const currentTime = audio2.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    progress2.style.width = `${progressPercent}%`;
    progressStick2.style.left = `${progressPercent}%`;
    let minutes = Math.round(duration) - Math.floor(Math.round(duration) / 60) * 60;
    if (minutes === 0) { minutes = '00' };
    let addZero;
    if (Math.round(currentTime) % 60 < 10) {
        addZero = '0';
    } else {
        addZero = '';
    }
    if (currentTime != 0) {
        time2.innerHTML = `0${Math.floor(Math.round(currentTime) / 60)}:${addZero}${Math.round(currentTime) % 60}-0${Math.floor(Math.round(duration) / 60)}:${minutes}`;
    }
}
function setProgress2(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio2.duration;
    audio2.currentTime = (clickX / width) * duration;
}
function end2() {
    audio2.currentTime = 0;
    player2.classList.remove('playSong');
    playBtn2.classList.remove('stop');
    playBtn2.classList.add('play');
    audio2.pause();
}
const tracks = document.querySelectorAll('.track2');
tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
        tracks.forEach(track => { track.classList.remove('track-active'); })
        audio2.src = `mp3/track${index}.mp3`;
        const duration = audio2.duration;
        pauseSong();
        playSong2();
        track.classList.add('track-active');
    })
});
