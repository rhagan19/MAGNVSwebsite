document.addEventListener('DOMContentLoaded', function () {
    // Fetch the data from the JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown options for each filter category
            populateDropdown('focus-select', data.focus);
            populateDropdown('type-select', data.types);
            populateDropdown('discipline-select', data.disciplines);
            populateDropdown('target-select', data.targets);
            populateDropdown('strategy-select', data.strategies);
            populateDropdown('technique-select', data.techniques);
        });

    // Initialize Select2 for multiselect dropdown
    $('.multiselect').select2({
        placeholder: "Select options",
        allowClear: true
    });

    // Event listener for clear button
    document.getElementById('clear-button').addEventListener('click', function () {
        $('.multiselect').val(null).trigger('change');
    });

    // Search functionality can be implemented here...
});

// Function to populate dropdown options
function populateDropdown(id, options) {
    var select = document.getElementById(id);
    options.forEach(option => {
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}
