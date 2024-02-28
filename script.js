$(document).ready(function() {
    // Initialize Select2 on the filter-dropdown elements
    $('.filter-dropdown').select2();

    // Fetch data from data.json and populate the secondary filter based on the strategy
    $('#strategy-dropdown').on('change', function() {
        var strategy = $(this).val();
        // Clear the secondary filter before adding new options
        $('#secondary-filter').empty().append(new Option("Select Filter", ""));
        $.getJSON('data.json', function(data) {
            // Filter data based on the strategy
            var filteredData = data.filter(function(item) {
                return item.strategy === strategy;
            });
            // Populate the secondary filter
            filteredData.forEach(function(item) {
                $('#secondary-filter').append(new Option(item.filterName, item.filterValue));
            });
            // Update Select2 with new options
            $('#secondary-filter').trigger('change');
        });
    });

    // Event listener for the Clear button
    $('.clear-button').on('click', function() {
        $('.filter-dropdown').val(null).trigger('change');
    });

    // Add additional event listeners and functionality as needed...
});
