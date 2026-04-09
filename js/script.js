// Test if script loads
console.log('Script loading...');

// Spotify Clone - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded');
    try {
        // Player state
        const state = {
            isPlaying: false,
            currentTrack: {
                name: 'Blinding Lights',
                artist: 'The Weeknd',
                duration: '3:20',
                currentTime: '0:00'
            },
            volume: 70,
            progress: 30,
            searchResults: []
        };

        // DOM Elements
        const playPauseBtn = document.querySelector('.btn-play-pause');
        const prevBtn = document.querySelector('.btn-prev');
        const nextBtn = document.querySelector('.btn-next');
        const progressBar = document.querySelector('.progress-bar');
        const progressFill = document.querySelector('.progress-fill');
        const volumeSlider = document.querySelector('.volume-slider');
        const volumeBtn = document.querySelector('.btn-volume');
        const trackItems = document.querySelectorAll('.track-item');
        const playlistCards = document.querySelectorAll('.playlist-card');
        const likeButtons = document.querySelectorAll('.btn-like');
        const searchInput = document.querySelector('.search-bar input');
        const searchBtn = document.querySelector('.btn-search');
        const searchResultsContainer = document.querySelector('.search-results');
        const playlistItems = document.querySelectorAll('.playlist-item');
        const createPlaylistBtn = document.querySelector('.btn-create-playlist');

        // Validate critical elements exist
        if (!searchInput || !searchBtn) {
            console.error('Critical search elements not found');
            return;
        }

        const searchResultsContainer = document.querySelector('.search-results');