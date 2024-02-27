document.addEventListener('DOMContentLoaded', function () {
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
