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
    resultsTable.innerHTML = ''; // Clear existing table rows

    videos.forEach((video, index) => {
        const row = resultsTable.insertRow();
        const selectCell = row.insertCell(0);
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select';
        selectButton.className = 'select-button';
        selectButton.onclick = function() { showProfile(index); };
        selectCell.appendChild(selectButton);

        const courseNameCell = row.insertCell(1);
        courseNameCell.textContent = video.course_name;

        const videoNameCell = row.insertCell(2);
        videoNameCell.textContent = video.video_name;

        const strategiesCell = row.insertCell(3);
        strategiesCell.textContent = Array.isArray(video.strategies) ? video.strategies.join(', ') : video.strategies || 'N/A';

        const techniquesCell = row.insertCell(4);
        techniquesCell.textContent = Array.isArray(video.techniques) ? video.techniques.map(t => t.variation).join(', ') : 'N/A';
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
