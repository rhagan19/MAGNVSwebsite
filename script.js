$(document).ready(function() {
    // Initialize Select2 on the filter-dropdown element
    $('.filter-dropdown').select2({
        placeholder: "Select options",
        allowClear: true,
        width: 'resolve' // This will help to make the dropdown wider
    });

    // Fetch data from data.json and populate the filter dropdown
    $.getJSON('data.json', function(data) {
        // Assuming data.json contains an array of objects with a country property
        data.forEach(function(item) {
            // Append each country as an option in the filter-dropdown
            $('.filter-dropdown').append(new Option(item.country, item.country));
        });

        // Update Select2 with new options
        $('.filter-dropdown').trigger('change');
    });

    // Event listener for the Clear button
    $('.clear-button').on('click', function() {
        // Clear selected options
        $('.filter-dropdown').val(null).trigger('change');
    });

    // Event listener for the Sort button (placeholder for sort functionality)
    $('.sort-button').on('click', function() {
        // You would add your sorting logic here
        console.log('Sort button clicked');
    });

    // Event listener for the search input (placeholder for search functionality)
    $('#search').on('input', function() {
        // You would add your search logic here
        console.log('Search:', $(this).val());
    });
});
