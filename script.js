document.addEventListener('DOMContentLoaded', function () {
    // Fetch the data from the JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the fetched data to check its structure
            // Populate the dropdown options for each filter category
            populateDropdown('focus-select', data.focus);
            populateDropdown('type-select', data.types);
            populateDropdown('discipline-select', data.disciplines);
            populateDropdown('target-select', data.targets);
            populateDropdown('strategy-select', data.strategies);
            populateDropdown('technique-select', data.techniques);
        })
        .catch(error => console.error('Error fetching data:', error)); // Log any errors that occur during fetch

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
