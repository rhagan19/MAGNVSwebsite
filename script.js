document.addEventListener('DOMContentLoaded', function () {
    let allVideos = [];
    let filters = {
        focus: null,
        type: null,
        discipline: null,
        target: null
    };

    // Fetch JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allVideos = data.videos;
            populateDropdown('focus-select', getUniqueValues(allVideos, 'focus'));
        })
        .catch(error => console.error('Error fetching data:', error));

    function populateDropdown(dropdownId, options) {
        const dropdown = document.getElementById(dropdownId);
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.innerHTML = option;
            dropdown.appendChild(opt);
        });
    }

    function getUniqueValues(videos, key) {
        return Array.from(new Set(videos.map(video => video[key])));
    }

    document.getElementById('focus-select').addEventListener('change', function () {
        const value = this.value;
        filters.focus = value;
        toggleDropdown('type-select', value);
        if (value) {
            const types = getUniqueValues(allVideos.filter(video => video.focus === value), 'type');
            populateDropdown('type-select', types);
        }
    });

    document.getElementById('type-select').addEventListener('change', function () {
        const value = this.value;
        filters.type = value;
        toggleDropdown('discipline-select', value);
        if (value) {
            const disciplines = getUniqueValues(allVideos.filter(video => video.type === value), 'discipline');
            populateDropdown('discipline-select', disciplines);
        }
    });

    document.getElementById('discipline-select').addEventListener('change', function () {
        const value = this.value;
        filters.discipline = value;
        toggleDropdown('target-select', value);
        if (value) {
            const targets = getUniqueValues(allVideos.filter(video => video.discipline === value), 'target');
            populateDropdown('target-select', targets);
        }
    });

    document.getElementById('search-btn').addEventListener('click', function () {
        const filteredVideos = allVideos.filter(video => {
            return
