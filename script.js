document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON data
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON data');
            }
            return response.json();
        })
        .then(data => {
            // Process the JSON data and populate the filters
            populateFilters(data);
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

    // Function to populate the filters
    function populateFilters(data) {
        // Example: Populate the strategy filter
        const strategySelect = document.getElementById('strategy-select');
        if (strategySelect) {
            strategySelect.innerHTML = '<option value="">Select Strategy</option>';
            // Assuming 'strategies' is an array in your JSON data
            data.strategies.forEach(strategy => {
                strategySelect.innerHTML += `<option value="${strategy}">${strategy}</option>`;
            });
        }

        // Similar logic for other filters...
    }

    // Event listeners and other functionalities can be added here
});
