let isPlaying = false;
let curr_track = document.createElement('audio');

const streamURL = "https://cast4.my-control-panel.com/proxy/dreamfmlebanon/stream";

curr_track.src = streamURL;
curr_track.load();

const playpause_btn = document.querySelector('.playpause-track');

curr_track.addEventListener('error', (e) => {
    console.error('Error loading the audio track:', e);
    alert('Error loading the audio track. Please check the URL or try another one.');
});

window.addEventListener('load', () => {
    tryAutoPlay();
});

function tryAutoPlay() {
    curr_track.play().then(() => {
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }).catch(error => {
        console.warn('Auto-play failed:', error);
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    });
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play().then(() => {
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }).catch(error => {
        console.error('Error playing the audio track:', error);
        alert('Error playing the audio track. Please check the URL or try another one.');
    });
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function goLive() {
    curr_track.pause();
    curr_track.currentTime = 0;
    curr_track.src = streamURL;
    curr_track.load();

    curr_track.play().then(() => {
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }).catch(error => {
        console.error('Error playing the audio track:', error);
        alert('Error playing the audio track. Please check the URL or try another one.');
    });
}
