document.addEventListener('DOMContentLoaded', function () {
    let allVideos = [];

    // Fetch JSON data
    fetch('data.json') // Adjust the URL as needed
        .then(response => response.json())
        .then(data => {
            allVideos = data.videos;
            // Call displayResults with all videos initially or only after search
            // displayResults(allVideos);
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
document.getElementById('search-btn').addEventListener('click', function() {
        const searchText = document.getElementById('search-box').value.toLowerCase();
        const filteredVideos = allVideos.filter(video => {
            // Assuming 'strategies' and 'techniques' are arrays within each video object
            // Modify the conditions based on your actual data structure
            return video.course_name.toLowerCase().includes(searchText) ||
                   video.video_name.toLowerCase().includes(searchText) ||
                   video.strategies.some(strategy => strategy.toLowerCase().includes(searchText)) ||
                   video.techniques.some(technique => technique.variation.toLowerCase().includes(searchText));
        });

        displayResults(filteredVideos);

        // Show the results container if it was previously hidden
        document.getElementById('results-container').classList.remove('hidden');
    });

    // Function to display the search results
    function displayResults(videos) {
        const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
        resultsTable.innerHTML = ''; // Clear existing table rows

        videos.forEach((video, index) => {
            const row = resultsTable.insertRow();

            // Create cells for course name, video name, etc.
            const courseNameCell = row.insertCell();
            courseNameCell.textContent = video.course_name;

            const videoNameCell = row.insertCell();
            videoNameCell.textContent = video.video_name;

            // Continue creating cells for strategies and techniques...
        });
    }
});
