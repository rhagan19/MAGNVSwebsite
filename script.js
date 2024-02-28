document.addEventListener('DOMContentLoaded', function () {
    const jsonUrl = "https://raw.githubusercontent.com/rhagan19/MAGNVSwebsite/main/data.json?token=GHSAT0AAAAAACOYZJTLFI44MHBROZ4ZUIBSZO6SF2Q";

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
});
