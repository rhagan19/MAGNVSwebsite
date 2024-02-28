// This function will fetch the JSON data and initialize the dropdowns
function initializeDropdowns() {
  fetch('data.json') // Replace 'data.json' with the path to your JSON file
    .then(response => response.json())
    .then(data => {
      populateDropdown(document.getElementById('strategy-select'), Object.keys(data.strategies));
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// This function populates a given dropdown with options
function populateDropdown(dropdown, options) {
  dropdown.innerHTML = ''; // Clear existing options
  options.forEach(optionValue => {
    let option = document.createElement('option');
    option.value = optionValue;
    option.text = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
    dropdown.appendChild(option);
  });
  dropdown.dispatchEvent(new Event('change')); // Trigger change event to populate dependent dropdowns
}

// Event listener for the 'strategy-select' dropdown
document.getElementById('strategy-select').addEventListener('change', function() {
  let selectedStrategy = this.value;
  fetch('data.json') // Replace 'data.json' with the path to your JSON file
    .then(response => response.json())
    .then(data => {
      if (selectedStrategy) {
        let types = data.strategies[selectedStrategy].types;
        populateDropdown(document.getElementById('type-select'), types);
      }
    })
    .catch(error => console.error('Error fetching JSON:', error));
});

// Event listener for the 'type-select' dropdown
document.getElementById('type-select').addEventListener('change', function() {
  let selectedType = this.value;
  // You would implement similar logic as above to populate the 'position-select' based on the selected type
  // ...
});

// Call this function when the page loads to initialize the 'strategy-select' dropdown
initializeDropdowns();
