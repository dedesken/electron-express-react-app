const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const dbPath = "../db"

module.exports.CarsDb = new sqlite3.Database(path.join(__dirname, dbPath, 'Data.db'), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to Data.db');
})

module.exports.AutoPartsDb = new sqlite3.Database(path.join(__dirname, dbPath, 'AutoPartsData.db'), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to AutoPartsData.db');
})
