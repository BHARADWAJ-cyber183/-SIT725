async function scanWebsite() {
    const url = document.getElementById('url').value;
    const resultsDiv = document.getElementById('results');

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    resultsDiv.innerHTML = '<p>Scanning...</p>';

    try {
        const response = await fetch('/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const results = await response.json();

        resultsDiv.innerHTML = `
            <p><strong>Results:</strong></p>
            <p>XSS Vulnerability: ${results.xss ? 'Detected' : 'Not Detected'}</p>
            <p>SQL Injection Vulnerability: ${results.sql_injection ? 'Detected' : 'Not Detected'}</p>
        `;
    } catch (error) {
        resultsDiv.innerHTML = '<p>Error occurred while scanning.</p>';
    }
}