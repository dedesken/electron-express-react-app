const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const carsRouter = require('./routes/carDbRoutes');
const partsRouter = require('./routes/autoPartsDbRoutes');
const SaveFiles = require('./controllers/appController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cars', carsRouter)
app.use('/parts', partsRouter)

app.post('/', SaveFiles)

app.listen(5000, () => console.log('App running on port 5000 🔥'));
