document.getElementById('translateButton').addEventListener('click', function () {
    const englishText = document.getElementById('englishText').value;
    const translateButton = document.getElementById('translateButton');
    const loadingIcon = document.getElementById('loadingIcon');
    const originalButtonText = translateButton.textContent;

    // Disable the button, change text, and show loading icon
    translateButton.disabled = true;
    translateButton.textContent = 'Loading...';
    loadingIcon.style.display = 'inline-block';

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: englishText })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('frenchTranslation').textContent = data.translation;
            // Re-enable the button, restore original text, and hide loading icon
            translateButton.disabled = false;
            translateButton.textContent = originalButtonText;
            loadingIcon.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            // Re-enable the button, restore original text, and hide loading icon even if there is an error
            translateButton.disabled = false;
            translateButton.textContent = originalButtonText;
            loadingIcon.style.display = 'none';
        });
});
