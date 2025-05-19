document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (searchTerm === 'domene' ) {
        document.getElementById('domene').scrollIntoView();
    } else if (searchTerm === 'statisk ip') {
        document.getElementById('statisk-ip').scrollIntoView();
    }
    else {
        alert('Beklager, fant ikke det du søkte etter.');
    }
});