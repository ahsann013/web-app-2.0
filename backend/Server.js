const express = require('express');

const app = express();
const port = 3000;

// Define your routes here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.get('/message', (req, res) => {
    res.send('This is a custom message!');
});

app.post('/message', (req, res) => {
    res.send('This is a custom message!');
}
);
app.get('/message/:id', (req, res) => {
    res.send(`This is a custom message with id ${req.params.id}!`);
});