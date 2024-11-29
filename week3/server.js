const express = require('express');
const app = express();
const port = 3001;

app.get('/scan', (req, res) => {
    const url = req.query.url;
    let result;

    // Basic validation check
    if (!url || !isValidUrl(url)) {
        result = 'Invalid URL';
    } else {
        // Here you would implement actual scanning logic
        result = 'URL is valid and ready for scanning.';
    }

    res.json({ result });
}); 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

function isValidUrl(string) {
    const res = string.match(/^(http|https):\/\/[^ "]+$/);
    return (res !== null);
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});