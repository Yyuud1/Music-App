const wrapper = document.querySelector('.wrapper'),
      musicImg = wrapper.querySelector('img'),
      musicName = wrapper.querySelector('.name'),
      musicArtist = wrapper.querySelector('.artist'),
      playPauseBtn = wrapper.querySelector('.play-pause'),
      prevBtn = wrapper.querySelector('#prev'),
      nextBtn = wrapper.querySelector('#next'),
      mainAudio = wrapper.querySelector('#main-audio'),
      progressArea = wrapper.querySelector('.progress-area'),
      progressBar = progressArea.querySelector('.progress-bar');

let indexMusic = Math.floor(
    (Math.random() * musicItem.length) + 1
);

window.addEventListener('load', () => {
    loadMusic(indexMusic);
})

const loadMusic = indexThumb => {
    musicName.innerText = musicItem[indexThumb - 1].name;
    musicArtist.innerText = musicItem[indexThumb - 1].artist;
    musicImg.src = `src/img/${musicItem[indexThumb - 1].src}.jpg`;
    mainAudio.src = `src/lagu/${musicItem[indexThumb - 1].src}.mp3`;
}

const playMusic = () => {
    wrapper.classList.add('paused');
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = `<i class = 'fi fi-sr-pause'></i>`;
    mainAudio.play();
}

const pauseMusic = () => {
    wrapper.classList.remove('paused');
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = `<i class = 'fi fi-sr-play'></i>`;
    mainAudio.pause();
}

const prevMusic = () => {
    indexMusic--;
    indexMusic < 1 ? indexMusic = musicItem.length : indexMusic = indexMusic;
    loadMusic(indexMusic);
    playMusic();
}

const nextMusic = () => {
    indexMusic++;
    indexMusic > musicItem.length ? indexMusic = 1 : indexMusic = indexMusic;
    loadMusic(indexMusic);
    playMusic();
}

// klik tombol play, prev dan next
playPauseBtn.addEventListener('click', playPauseButtonHandler);
nextBtn.addEventListener('click', nextButtonHandler);
prevBtn.addEventListener('click', prevButtonHandler);

// progress area
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (
        currentTime/duration
    ) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector('.current-time'),
        musicDuration = wrapper.querySelector('.max-duration');

    mainAudio.addEventListener('loadeddata', () => {
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration/60);
        let totalSec = Math.floor(mainAdDuration%60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`
    });

    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime%60);

    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// klik progress area
progressArea.addEventListener('click', progressAreaKlik);


mainAudio.addEventListener('ended', () => {
    nextMusic();
})


