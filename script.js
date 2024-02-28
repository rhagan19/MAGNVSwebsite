document.addEventListener('DOMContentLoaded', function () {
    // Fetch JSON data
    fetch('https://raw.githubusercontent.com/rhagan19/MAGNVSwebsite/main/data.json?token=GHSAT0AAAAAACOYZJTLKH2ENSVALRQ5VDLQZO6SLZQ')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Populate other dropdowns as needed
            populateDropdown('type-select', data.types);
            populateDropdown('discipline-select', data.disciplines);
            populateDropdown('target-select', data.targets);
            populateDropdown('technique-select', data.techniques);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Additional error handling if needed
        });

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
