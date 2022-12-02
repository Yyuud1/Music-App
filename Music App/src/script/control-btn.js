const playPauseButtonHandler = () => {
    const isMusicPlay = wrapper.classList.contains('paused');
    isMusicPlay ? pauseMusic() : playMusic();
}

const nextButtonHandler = () => {
    nextMusic();
}

const prevButtonHandler = () => {
    prevMusic();
}

const progressAreaKlik = (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedSetX / progressWidth) * songDuration;
    playMusic();
}