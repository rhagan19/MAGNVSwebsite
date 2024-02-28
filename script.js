document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch data from data.json
    function fetchData(callback) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to populate filters
    function populateFilters(data) {
        // Get unique values for each filter category
        const filterCategories = ['focus', 'type', 'discipline', 'target', 'strategy', 'technique'];

        filterCategories.forEach(category => {
            const uniqueValues = [...new Set(data.map(item => item[category]))];
            const dropdown = document.getElementById(`${category}-select`);
            dropdown.innerHTML = ''; // Clear previous options
            dropdown.style.display = 'block'; // Show the dropdown

            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = `Select ${category.charAt(0).toUpperCase() + category.slice(1)}`;
            dropdown.appendChild(defaultOption);

            // Add options for each unique value
            uniqueValues.forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                dropdown.appendChild(option);
            });
        });

        // Initialize Select2 for multiselect dropdown
        $('.filter-dropdown').select2({
            placeholder: "Select options",
            allowClear: true
        });
    }

    // Populate filters when the DOM content is loaded
    fetchData(populateFilters);

    // Event listeners for other interactive elements can go here...

    // Example: Clear button functionality
    document.querySelector('#clear-button').addEventListener('click', function () {
        $('.filter-dropdown').val(null).trigger('change');
    });

    // Search functionality can be implemented here...
});
