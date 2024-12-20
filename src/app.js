const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../front_end')));

app.use('/planets', routes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
