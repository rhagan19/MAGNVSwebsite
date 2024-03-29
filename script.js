document.addEventListener('DOMContentLoaded', function () {
    let allVideos = [];

    // Fetch JSON data
// Fetch JSON data
fetch('data.json') // Adjust the URL as needed
    .then(response => response.json())
    .then(data => {
        allVideos = data.videos;
        if (Array.isArray(allVideos) && allVideos.length > 0) {
            // Call populateDropdowns only if allVideos is a non-empty array
            populateDropdowns(allVideos);
        } else {
            // Handle the case where allVideos is empty or not an array
            console.error('No videos found or data is in an incorrect format.');
        }
    })
    .catch(error => {
        // Handle any errors during fetch or data processing
        console.error('Error fetching data:', error);
    });


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
        if (item[key]) { // Ensure the key exists
            if (Array.isArray(item[key])) {
                item[key].forEach(subItem => unique.add(subItem));
            } else {
                unique.add(item[key]);
            }
        }
    });
    return [...unique].sort(); // Return a sorted array for better user experience
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
        strategiesCell.textContent = video.strategies.join(', ');

        // Handle techniques
        const techniquesCell = row.insertCell(4);
        if (Array.isArray(video.techniques)) {
            techniquesCell.textContent = video.techniques.map(t => {
                // Assuming each technique has a 'name' property.
                // You should replace 'name' with the actual property you want to display.
                return t.name ? t.name : 'N/A';
            }).join(', ');
        } else {
            techniquesCell.textContent = 'N/A';
        }
    });
}
