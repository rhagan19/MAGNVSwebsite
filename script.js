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
    const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];

    // Clear existing table rows
    resultsTable.innerHTML = '';

    videos.forEach(video => {
        const row = resultsTable.insertRow();

        // Handle strategies if it's an array or an object
        let strategies = '';
        if (Array.isArray(video.strategies)) {
            strategies = video.strategies.join(', ');
        } else if (typeof video.strategies === 'object') {
            strategies = Object.values(video.strategies).join(', ');
        } else {
            strategies = video.strategies || 'N/A';
        }

        // Handle techniques if it's an array of objects or strings
        let techniques = '';
        if (Array.isArray(video.techniques)) {
            if (video.techniques.length > 0 && typeof video.techniques[0] === 'object') {
                techniques = video.techniques.map(t => t.variation).join(', ');
            } else if (typeof video.techniques[0] === 'string') {
                techniques = video.techniques.join(', ');
            }
        } else {
            techniques = 'N/A';
        }

        row.innerHTML = `
            <td>Select</td>
            <td>${video.course_name}</td>
            <td>${video.video_name}</td>
            <td>${strategies}</td>
            <td>${techniques}</td>
        `;
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
