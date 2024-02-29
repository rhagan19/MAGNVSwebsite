document.addEventListener('DOMContentLoaded', function () {
    let allVideos = [];

    // Fetch JSON data
    fetch('data.json') // Adjust the URL as needed
        .then(response => response.json())
        .then(data => {
            allVideos = data.videos;
            populateDropdown('focus-select', getUniqueValues(allVideos, 'focus'));
            // The other dropdowns will be populated dynamically based on the 'focus' selection
        })
        .catch(error => console.error('Error fetching data:', error));

    // Populates dropdown options
    function populateDropdown(dropdownId, options) {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
        dropdown.insertAdjacentHTML('afterbegin', '<option value="">Select</option>');
    }

    // Gets unique values for dropdowns
    function getUniqueValues(array, key) {
        return [...new Set(array.map(item => item[key]))].sort();
    }

    // Event listeners for dropdowns
    document.getElementById('focus-select').addEventListener('change', function () {
        toggleDropdown('type-select', this.value);
        if (this.value) {
            let filteredTypes = allVideos.filter(video => video.focus === this.value).map(video => video.type);
            populateDropdown('type-select', getUniqueValues(filteredTypes, 'type'));
        }
    });

    document.getElementById('type-select').addEventListener('change', function () {
        toggleDropdown('discipline-select', this.value);
        if (this.value) {
            let filteredDisciplines = allVideos.filter(video => video.type === this.value).map(video => video.discipline);
            populateDropdown('discipline-select', getUniqueValues(filteredDisciplines, 'discipline'));
        }
    });

    document.getElementById('discipline-select').addEventListener('change', function () {
        let targetSelect = document.getElementById('target-select');
        targetSelect.style.display = this.value ? 'inline-block' : 'none';
        // Assume that the JSON structure includes a 'target' field to filter on
        if (this.value) {
            let filteredTargets = allVideos.filter(video => video.discipline === this.value).map(video => video.target);
            populateDropdown('target-select', getUniqueValues(filteredTargets, 'target'));
        }
    });

    // Search button event listener
    document.getElementById('search-btn').addEventListener('click', filterVideos);

    // Reset button event listener
    document.getElementById('reset-btn').addEventListener('click', function () {
        document.querySelectorAll('.filter').forEach(dropdown => dropdown.selectedIndex = 0);
        document.querySelectorAll('.filter').forEach(dropdown => dropdown.style.display = 'none');
        document.getElementById('focus-select').style.display = 'inline-block';
        document.getElementById('reset-btn').style.display = 'none';
        // Clear results if necessary
        // ... Add any additional reset logic here ...
    });

    // Filter videos based on selections
    function filterVideos() {
        // ... Add logic to filter videos based on dropdown selections ...
    }

    // Helper function to toggle the display of dropdowns
    function toggleDropdown(dropdownId, value) {
        let dropdown = document.getElementById(dropdownId);
        dropdown.style.display = value ? 'inline-block' : 'none';
        if (!value) dropdown.selectedIndex = 0; // Reset dropdown if the value is falsey
    }

    // Function to display filtered results
    function displayResults(videos) {
        // ... Add logic to display results ...
    }
});
