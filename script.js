document.addEventListener('DOMContentLoaded', function () {
    // Initialize Select2 for multiselect dropdown
    $('.multiselect').select2({
        placeholder: "Select options",
        allowClear: true
    });

    // Fetching data.json and initializing filters dynamically
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is structured appropriately
        // Initialize your filters here based on the data
        // For example, populate a 'category' filter
        populateFilterOptions('category-filter', data.categories);
        
        // More filter initializations can follow...
    })
    .catch(error => console.error('Error fetching data:', error));

    // Function to populate filter options
    function populateFilterOptions(filterElementId, options) {
        const filterElement = document.getElementById(filterElementId);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            filterElement.appendChild(optionElement);
        });

        // Re-initialize Select2 for the updated filter
        $(`#${filterElementId}`).select2({
            placeholder: "Select options",
            allowClear: true
        });
    }

    // Event listeners for filter changes to dynamically update other filters can go here...
    // Example: On 'category' filter change, update 'sub-category' filter
    document.getElementById('category-filter').addEventListener('change', function () {
        const selectedCategory = this.value;
        // Fetch or filter sub-category options based on selectedCategory
        // Update 'sub-category' filter accordingly
        // populateFilterOptions('sub-category-filter', filteredSubCategories);
    });

    // Example: Clear button functionality
    document.querySelector('.clear-button').addEventListener('click', function () {
        $('.multiselect').val(null).trigger('change');
    });

    // Search functionality can be implemented here...
});
