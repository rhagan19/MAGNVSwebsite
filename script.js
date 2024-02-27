document.addEventListener('DOMContentLoaded', function () {
    const filterOffenseDefenseSelect = document.getElementById('filterOffenseDefense');
    const filterFocusSelect = document.getElementById('filterFocus');
    const filterDisciplineSelect = document.getElementById('filterDiscipline');
    const filterTargetsSelect = document.getElementById('filterTargets');
    const resultsDiv = document.getElementById('results');
    let techniquesData = []; // Variable to store the fetched JSON data

    // Fetch JSON data
    async function fetchData() {
        try {
            const response = await fetch('URL_TO_YOUR_JSON_FILE');
            techniquesData = await response.json();
            return techniquesData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Extract unique values for a given attribute from the techniques data
    function extractUniqueValues(attribute) {
        return [...new Set(techniquesData.map(technique => technique[attribute]))];
    }

    // Populate dropdown menu with unique values for a given attribute
    function populateDropdown(selectElement, values) {
        selectElement.innerHTML = '';
        selectElement.appendChild(new Option('All', '')); // Add 'All' option
        values.forEach(value => {
            selectElement.appendChild(new Option(value, value));
        });
    }

    // Update dropdown menus with unique values for each attribute
    async function updateDropdowns() {
        await fetchData(); // Fetch data before updating dropdowns
        const offenseDefenseValues = extractUniqueValues('offenseDefense');
        const focusValues = extractUniqueValues('focus');
        const disciplineValues = extractUniqueValues('discipline');
        const targetsValues = extractUniqueValues('targets');

        populateDropdown(filterOffenseDefenseSelect, offenseDefenseValues);
        populateDropdown(filterFocusSelect, focusValues);
        populateDropdown(filterDisciplineSelect, disciplineValues);
        populateDropdown(filterTargetsSelect, targetsValues);
    }

    // Filter techniques based on selected options and display results
    function filterAndDisplayResults() {
        const selectedOffenseDefense = filterOffenseDefenseSelect.value;
        const selectedFocus = filterFocusSelect.value;
        const selectedDiscipline = filterDisciplineSelect.value;
        const selectedTargets = filterTargetsSelect.value;

        const filteredTechniques = techniquesData.filter(technique =>
            (!selectedOffenseDefense || technique.offenseDefense === selectedOffenseDefense) &&
            (!selectedFocus || technique.focus === selectedFocus) &&
            (!selectedDiscipline || technique.discipline === selectedDiscipline) &&
            (!selectedTargets || technique.targets === selectedTargets)
        );

        displayResults(filteredTechniques);
    }

    // Display filtered results
    function displayResults(filteredTechniques) {
        resultsDiv.innerHTML = '';
        filteredTechniques.forEach(technique => {
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

    // Event listeners for dropdown menu changes
    filterOffenseDefenseSelect.addEventListener('change', filterAndDisplayResults);
    filterFocusSelect.addEventListener('change', filterAndDisplayResults);
    filterDisciplineSelect.addEventListener('change', filterAndDisplayResults);
    filterTargetsSelect.addEventListener('change', filterAndDisplayResults);

    // Initialize dropdown menus and display results when the page loads
    updateDropdowns();
    filterAndDisplayResults();
});
