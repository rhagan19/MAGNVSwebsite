document.addEventListener('DOMContentLoaded', function () {
    let allVideos = [];

    // Fetch JSON data
    fetch('data.json') // Adjust the URL as needed
        .then(response => response.json())
        .then(data => {
            allVideos = data.videos;
            populateDropdowns(allVideos);
            displayResults(allVideos); // Display all videos initially
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
        dropdown.innerHTML = '<option value="">Select</option>'; // Clear existing options and add the default option
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

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function() {
    const searchText = searchBox.value.toLowerCase();
    const filteredVideos = allVideos.filter(video => {
        return video.course_name.toLowerCase().includes(searchText) ||
               video.video_name.toLowerCase().includes(searchText) ||
               (video.strategies && video.strategies.some(strategy => strategy.toLowerCase().includes(searchText))) ||
               (video.techniques && video.techniques.some(technique => technique.variation.toLowerCase().includes(searchText)));
    });
    displayResults(filteredVideos);
});


    function displayResults(videos) {
        const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
        resultsTable.innerHTML = ''; // Clear existing table rows

        videos.forEach((video, index) => {
            const row = resultsTable.insertRow();

            // Create the 'Select' button
            const selectCell = row.insertCell(0);
            const selectButton = document.createElement('button');
            selectButton.textContent = 'Select';
            selectButton.className = 'select-button';
            selectButton.addEventListener('click', function() {
                window.location.href = `video-details.html?index=${index}`;
            });
            selectCell.appendChild(selectButton);

            // The rest of the cells
            const courseNameCell = row.insertCell(1);
            courseNameCell.textContent = video.course_name;

            const videoNameCell = row.insertCell(2);
            videoNameCell.textContent = video.video_name;

            // Handle strategies
            const strategiesCell = row.insertCell(3);
            if (Array.isArray(video.strategies)) {
                strategiesCell.textContent = video.strategies.join(', ');
            } else if (typeof video.strategies === 'object') {
                strategiesCell.textContent = Object.values(video.strategies).join(', ');
            } else {
                strategiesCell.textContent = 'N/A';
            }

            // Handle techniques
            const techniquesCell = row.insertCell(4);
            if (Array.isArray(video.techniques)) {
                techniquesCell.textContent = video.techniques.map(t => t.variation || 'N/A').join(', ');
            } else {
                techniquesCell.textContent = 'N/A';
            }
        });
    }
});
