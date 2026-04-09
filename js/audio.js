// Audio-enabled version with actual playback
console.log('Audio version loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded in audio version');

    // Audio element for playback
    const audio = new Audio();
    let isPlaying = false;
    let currentTrack = null;

    // UI Elements
    const playPauseBtn = document.querySelector('.btn-play-pause');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const trackNameEl = document.querySelector('.player-track-name');
    const artistNameEl = document.querySelector('.player-artist-name');
    const albumArtEl = document.querySelector('.player-album-art');
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.search-bar input');

    // Update UI
    function updateUI(track) {
        if (!track) return;

        trackNameEl.textContent = track.name || 'Unknown';
        artistNameEl.textContent = track.artist || 'Unknown Artist';
        durationEl.textContent = track.duration || '0:00';
        currentTimeEl.textContent = '0:00';

        if (track.artwork) {
            albumArtEl.src = track.artwork;
        }

        // Reset progress
        progressFill.style.width = '0%';
    }

    // Update time display
    function updateTimeDisplay() {
        if (!audio.duration) return;

        const currentTime = audio.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Update progress bar
        const progress = (currentTime / audio.duration) * 100;
        progressFill.style.width = `${progress}%`;
    }

    // Play/Pause functionality
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = '▶';
        } else {
            if (currentTrack) {
                audio.play().catch(e => console.error('Play error:', e));
                playPauseBtn.textContent = '⏸';
            }
        }
        isPlaying = !isPlaying;
    }

    playPauseBtn.addEventListener('click', togglePlay);

    // Progress bar click
    progressBar.addEventListener('click', (e) => {
        if (!audio.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    // Previous track
    prevBtn.addEventListener('click', () => {
        audio.currentTime = 0;
        if (isPlaying) {
            audio.play().catch(e => console.error('Play error:', e));
        }
    });

    // Next track
    nextBtn.addEventListener('click', () => {
        audio.currentTime = 0;
        // In a real app, we'd get the next track from a playlist
        // For now, just restart current track
        if (isPlaying) {
            audio.play().catch(e => console.error('Play error:', e));
        }
    });

    // Audio event listeners
    audio.addEventListener('timeupdate', updateTimeDisplay);
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.textContent = '▶';
    });
    audio.addEventListener('play', () => {
        isPlaying = true;
        playPauseBtn.textContent = '⏸';
    });
    audio.addEventListener('pause', () => {
        isPlaying = false;
        playPauseBtn.textContent = '▶';
    });

    // Search functionality
    async function searchAndPlay(query) {
        if (!query) return;

        try {
            const response = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`
            );

            if (!response.ok) throw new Error('Search failed');

            const data = await response.json();
            if (!data.results.length) {
                alert('No results found');
                return;
            }

            const track = data.results[0];
            const newTrack = {
                name: track.trackName,
                artist: track.artistName,
                duration: formatTime(track.trackTimeMillis),
                artwork: track.artworkUrl100,
                previewUrl: track.previewUrl
            };

            // Load and play the track
            if (newTrack.previewUrl) {
                audio.src = newTrack.previewUrl;
                currentTrack = newTrack;
                updateUI(newTrack);

                // Try to play
                try {
                    await audio.play();
                    playPauseBtn.textContent = '⏸';
                    isPlaying = true;
                    alert(`Now playing: ${newTrack.name} by ${newTrack.artist}`);
                } catch (e) {
                    alert('Unable to play audio (may be restricted). Showing track info instead.');
                    updateUI(newTrack);
                }
            } else {
                alert('No preview available for this track');
                updateUI(newTrack);
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed. Please try again.');
        }
    }

    function formatTime(millis) {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        searchAndPlay(query);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            searchAndPlay(query);
        }
    });

    // Initialize with a sample track
    updateUI({
        name: 'Sample Track',
        artist: 'Sample Artist',
        duration: '0:00'
    });

    // Auto-search for a popular track on load
    setTimeout(() => {
        searchAndPlay('Blinding Lights');
    }, 1000);
});