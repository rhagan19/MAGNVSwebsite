document.addEventListener('DOMContentLoaded', function () {
    let allVideos = [];

    // Fetch JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allVideos = data.videos;
            initializeFilters();
        })
        .catch(error => console.error('Error fetching data:', error));

    function initializeFilters() {
        // Initialize your filters based on the allVideos data
        // For example:
        populateDropdown('focus-select', extractUniquePropertyValues(allVideos, 'focus'));
        // ... and so on for other filters if needed
    }

    function populateDropdown(dropdownId, options) {
        const dropdown = document.getElementById(dropdownId);
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            dropdown.appendChild(opt);
        });
    }

    function extractUniquePropertyValues(videos, property) {
        const values = videos.map(video => video[property]);
        return [...new Set(values)].sort();
    }

    // Event listener for the 'focus-select' dropdown changes
    document.getElementById('focus-select').addEventListener('change', function () {
        // Show the next filter, populate it, and handle cascading logic
        // Similar to the example provided in the previous response
    });

    // Event listeners for other dropdowns would go here

    document.getElementById('search-btn').addEventListener('click', function () {
        // Handle the search action
    });

    document.getElementById('reset-btn').addEventListener('click', function () {
        // Handle the reset action
    });

    // Add other functions and event listeners as needed
});
