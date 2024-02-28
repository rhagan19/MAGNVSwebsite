document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from data.json file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate filters dynamically
            populateFilters(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Initialize Select2 for multiselect dropdown
    $('.multiselect').select2({
        placeholder: "Select options",
        allowClear: true
    });

    // Event listeners for other interactive elements can go here...

    // Example: Clear button functionality
    document.querySelector('.clear-button').addEventListener('click', function () {
        $('.multiselect').val(null).trigger('change');
    });

    // Search functionality can be implemented here...
});

// Function to populate filters dynamically
function populateFilters(data) {
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    filterDropdowns.forEach(dropdown => {
        const filterCategory = dropdown.getAttribute('data-filter-category');
        const options = data[filterCategory];
        if (options && options.length > 0) {
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.textContent = option;
                optionElement.value = option;
                dropdown.appendChild(optionElement);
            });
        }
    });
}
