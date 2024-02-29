document.addEventListener('DOMContentLoaded', function () {
    // Fetch JSON data
    fetch('https://raw.githubusercontent.com/rhagan19/MAGNVSwebsite/main/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Populate dropdowns
            populateDropdown('focus-select', getUniqueValues(data.videos, 'focus'));
            populateDropdown('type-select', getUniqueValues(data.videos, 'types'));
            populateDropdown('discipline-select', getUniqueValues(data.videos, 'disciplines'));
            populateDropdown('target-select', getUniqueValues(data.videos, 'targets'));
            populateDropdown('technique-select', getUniqueValues(data.videos, 'techniques'));
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to populate dropdown
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

    // Function to get unique values from array of objects
    function getUniqueValues(array, key) {
        const uniqueValues = new Set();
        array.forEach(item => {
            if (Array.isArray(item[key])) {
                item[key].forEach(value => uniqueValues.add(value));
            } else {
                uniqueValues.add(item[key]);
            }
        });
        return Array.from(uniqueValues);
    }

    // Event listeners for other interactive elements can go here...

    // Example: Search functionality
    document.getElementById('search-btn').addEventListener('click', function () {
        const searchQuery = document.getElementById('search-box').value;
        // Perform search based on the query
        console.log('Search query:', searchQuery);
    });
});
