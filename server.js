const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

app.use('/', express.static('public'));

// *********Hard coded budget ***********//
// const budget = {
//     myBudget: [
//     {
//         title: 'Eat out',
//         budget: 25
//     },
//     {
//         title: 'Rent',
//         budget: 375
//     },
//     {
//         title: 'Grocery',
//         budget: 110
//     }
//     ]
// };

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// *********Hard coded budget ***********//
// app.get('/budget', (req, res) => {
//     res.json(budget);
// });


// *********Final solution********** //
app.get('/budget', (req, res) => {
    const budget = JSON.parse(fs.readFileSync('budget.json', 'utf-8'));
    res.json(budget);
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
});