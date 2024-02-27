document.addEventListener('DOMContentLoaded', function () {
    // Initialize the tooltip and popover from Bootstrap
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // Initialize the Select2 plugin for multiselect dropdowns
    $('.multiselect').select2({
        placeholder: "Select an option"
    });

    // Customizing the search box
    $('#search').attr('placeholder', 'MAGNVS Library');
    $('#search').addClass('form-control');

    // Curved corners for search box
    $('#search').css('border-radius', '15px');

    // Fetch and populate data
    const filterOffenseDefenseSelect = document.getElementById('filterOffenseDefense');
    const filterFocusSelect = document.getElementById('filterFocus');
    const filterDisciplineSelect = document.getElementById('filterDiscipline');
    const filterTargetsSelect = document.getElementById('filterTargets');
    const resultsDiv = document.getElementById('results');
    let techniquesData = []; // Variable to store the fetched JSON data

    async function fetchData() {
        try {
            const response = await fetch('URL_TO_YOUR_JSON_FILE');
            techniquesData = await response.json();
            return techniquesData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function extractUniqueValues(attribute) {
        return [...new Set(techniquesData.map(technique => technique[attribute]))];
    }

    function populateDropdown(selectElement, values) {
        selectElement.innerHTML = '';
        selectElement.appendChild(new Option('All', ''));
        values.forEach(value => {
            selectElement.appendChild(new Option(value, value));
        });
    }

    async function updateDropdowns() {
        await fetchData();
        const offenseDefenseValues = extractUniqueValues('offenseDefense');
        const focusValues = extractUniqueValues('focus');
        const disciplineValues = extractUniqueValues('discipline');
        const targetsValues = extractUniqueValues('targets');

        populateDropdown(filterOffenseDefenseSelect, offenseDefenseValues);
        populateDropdown(filterFocusSelect, focusValues);
        populateDropdown(filterDisciplineSelect, disciplineValues);
        populateDropdown(filterTargetsSelect, targetsValues);
    }

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

    filterOffenseDefenseSelect.addEventListener('change', filterAndDisplayResults);
    filterFocusSelect.addEventListener('change', filterAndDisplayResults);
    filterDisciplineSelect.addEventListener('change', filterAndDisplayResults);
    filterTargetsSelect.addEventListener('change', filterAndDisplayResults);

    updateDropdowns();
    filterAndDisplayResults();
});
