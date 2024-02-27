document.addEventListener('DOMContentLoaded', function () {
    const filterTypeSelect = document.getElementById('filterType');
    const resultsDiv = document.getElementById('results');

    // Fetch JSON data
    async function fetchData() {
        try {
            const response = await fetch('URL_TO_YOUR_JSON_FILE');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Filter data based on selected filter type
    async function filterData(filterType) {
        const data = await fetchData();
        const filteredData = data.filter(technique => technique.type === filterType);
        return filteredData;
    }

    // Display filtered results
    async function displayResults() {
        const filterType = filterTypeSelect.value;
        const filteredData = await filterData(filterType);

        // Clear previous results
        resultsDiv.innerHTML = '';

        // Display filtered results
        filteredData.forEach(technique => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');
            resultDiv.innerHTML = `
                <h2>${technique.name}</h2>
                <p>${technique.description}</p>
                <!-- Add more details as needed -->
            `;
            resultsDiv.appendChild(resultDiv);
        });
    }

    // Event listener for filter change
    filterTypeSelect.addEventListener('change', displayResults);

    // Initial display of results
    displayResults();
});
