// Simple working version
console.log('Working version loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded in working version');

    const playPauseBtn = document.querySelector('.btn-play-pause');
    if (playPauseBtn) {
        playPauseBtn.textContent = '▶';
        playPauseBtn.addEventListener('click', () => {
            if (playPauseBtn.textContent === '▶') {
                playPauseBtn.textContent = '⏸';
                alert('Playing!');
            } else {
                playPauseBtn.textContent = '▶';
                alert('Paused!');
            }
        });
    }

    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.search-bar input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                alert('Searching for: ' + query);
            }
        });
    }
});