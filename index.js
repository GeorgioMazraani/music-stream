let isPlaying = false;
let curr_track = document.createElement('audio');

// Example alternative streaming URL
const streamURL = "https://cast4.my-control-panel.com/proxy/dreamfmlebanon/stream";

// Initialize the audio element with the streaming URL
curr_track.src = streamURL;
curr_track.load();

const playpause_btn = document.querySelector('.playpause-track');
const volume_slider = document.querySelector('.volume_slider');

curr_track.addEventListener('error', (e) => {
    console.error('Error loading the audio track:', e);
    alert('Error loading the audio track. Please check the URL or try another one.');
});

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

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
    console.log('Volume set to:', curr_track.volume);
}

// Update volume slider to match the current volume
function updateVolumeSlider() {
    volume_slider.value = curr_track.volume * 100;
    console.log('Volume slider updated to:', volume_slider.value);
}

// Detect visibility change to update volume
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Update the volume to match the device volume when the page becomes visible
        curr_track.volume = volume_slider.value / 100;
        console.log('Visibility changed. Volume updated to:', curr_track.volume);
    }
});

// Event listener for volume slider
volume_slider.addEventListener('input', () => {
    setVolume();
    console.log('Volume slider input detected. Volume set to:', volume_slider.value);
});

// Add touch event listener for mobile devices
volume_slider.addEventListener('touchend', () => {
    setVolume();
    console.log('Volume slider touchend detected. Volume set to:', volume_slider.value);
});
