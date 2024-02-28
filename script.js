document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded');

    // Fetch the data from the JSON file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data);
            // Check if the data is in the expected format
            if (!data || !Array.isArray(data)) {
                throw new Error('Invalid data format');
            }
            // Extracting defensive strategies from the data
            const defensiveStrategies = data.map(item => item.defensive).filter(defensive => defensive);
            // Populate the dropdown options for each filter category
            populateDropdown('focus-select', defensiveStrategies.map(defensive => defensive.focus));
            populateDropdown('type-select', [].concat(...defensiveStrategies.map(defensive => defensive.types)));
            populateDropdown('discipline-select', [].concat(...defensiveStrategies.map(defensive => defensive.disciplines)));
            populateDropdown('target-select', [].concat(...defensiveStrategies.map(defensive => defensive.targets)));
            populateDropdown('strategy-select', [].concat(...defensiveStrategies.map(defensive => Object.keys(defensive.strategies))));
            populateDropdown('technique-select', [].concat(...[].concat(...defensiveStrategies.map(defensive => Object.values(defensive.strategies).map(Object.keys)))));
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
        });

    // Function to populate dropdown options
    function populateDropdown(selectId, options) {
        const select = document.getElementById(selectId);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }
});
