document.addEventListener('DOMContentLoaded', function () {
    let allVideos = [];

    // Fetch JSON data
    fetch('data.json') // Adjust the URL as needed
        .then(response => response.json())
        .then(data => {
            allVideos = data.videos;
            populateDropdowns(allVideos);
        })
        .catch(error => console.error('Error fetching data:', error));

    function populateDropdowns(videos) {
        populateDropdown('focus-select', getUniqueValues(videos, 'focus'));
        populateDropdown('type-select', getUniqueValues(videos, 'types'));
        populateDropdown('discipline-select', getUniqueValues(videos, 'disciplines'));
        populateDropdown('target-select', getUniqueValues(videos, 'targets'));
    }

    function populateDropdown(dropdownId, options) {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = ''; // Clear existing options
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select';
        defaultOption.value = '';
        dropdown.appendChild(defaultOption);
        options.forEach(option => {
            const newOption = document.createElement('option');
            newOption.text = option;
            newOption.value = option;
            dropdown.appendChild(newOption);
        });
    }

    function getUniqueValues(array, key) {
        const unique = new Set();
        array.forEach(item => {
            if (Array.isArray(item[key])) {
                item[key].forEach(subItem => unique.add(subItem));
            } else {
                unique.add(item[key]);
            }
        });
        return [...unique];
    }

    // Filter function
    document.getElementById('search-btn').addEventListener('click', () => {
        const focusValue = document.getElementById('focus-select').value;
        const typeValue = document.getElementById('type-select').value;
        const disciplineValue = document.getElementById('discipline-select').value;
        const targetValue = document.getElementById('target-select').value;

        const filteredVideos = allVideos.filter(video => {
            return (!focusValue || video.focus === focusValue) &&
                   (!typeValue || video.types.includes(typeValue)) &&
                   (!disciplineValue || video.disciplines.includes(disciplineValue)) &&
                   (!targetValue || video.targets.includes(targetValue));
        });

        displayResults(filteredVideos);
    });

    function displayResults(videos) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
            videos.forEach(video => {
        const videoElement = document.createElement('div');
            videoElement.classList.add('video');
        const strategies = Array.isArray(video.strategies) ? video.strategies.join(', ') : video.strategies;
        videoElement.innerHTML = `
            <h2>${video.course_name} - ${video.video_name}</h2>
            <p><strong>Focus:</strong> ${video.focus}</p>
            <p><strong>Types:</strong> ${video.types.join(', ')}</p>
            <p><strong>Disciplines:</strong> ${video.disciplines.join(', ')}</p>
            <p><strong>Targets:</strong> ${video.targets.join(', ')}</p>
            <p><strong>Strategies:</strong> ${strategies}</p>
        `;
        resultsContainer.appendChild(videoElement);
    });
}


    window.showProfile = function(index) {
        const video = allVideos[index];
        const profilePage = document.getElementById('profile-page');
        profilePage.style.display = 'block';
        profilePage.innerHTML = `
            <h2>${video.video_name}</h2>
            <p>Course: ${video.course_name}</p>
            <p>Focus: ${video.focus}</p>
            <p>Types: ${video.types.join(', ')}</p>
            <p>Disciplines: ${video.disciplines.join(', ')}</p>
            <p>Targets: ${video.targets.join(', ')}</p>
            <p>Strategies: ${video.strategies.join(', ')}</p>
            <p>Techniques: ${video.techniques.map(t => t.variation).join(', ')}</p>
        `;
        // Scroll to the profile view
        profilePage.scrollIntoView();
    };
});
