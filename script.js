document.addEventListener('DOMContentLoaded', function () {
    // Fetch JSON data
    fetch('https://raw.githubusercontent.com/rhagan19/MAGNVSwebsite/main/data.json')
        .then(response => response.json())
        .then(data => {
            // Populate dropdowns
            populateDropdown('strategy-select', data.strategies);
            populateDropdown('type-select', data.types);
            populateDropdown('discipline-select', data.disciplines);
            populateDropdown('target-select', data.targets);
            populateDropdown('technique-select', data.techniques);
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

    // Event listeners for other interactive elements can go here...

    // Example: Search functionality
    document.getElementById('search-btn').addEventListener('click', function () {
        const searchQuery = document.getElementById('search-box').value;
        // Perform search based on the query
        console.log('Search query:', searchQuery);
    });
});
