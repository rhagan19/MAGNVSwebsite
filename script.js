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
        // Add technique-select population logic if necessary
        // Strategy-select is not populated here as strategies are more descriptive and not suited for dropdown filtering in this context
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
        const container = document.getElementById('results-container');
        container.innerHTML = ''; // Clear previous results

        videos.forEach(video => {
            const div = document.createElement('div');
            div.classList.add('video-result');
            div.innerHTML = `<h3>${video.video_name}</h3><p>Focus: ${video.focus}</p>`;
            // Add more details as needed
            container.appendChild(div);
        });
    }
});
