const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;


app.set('port', PORT);
app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})


