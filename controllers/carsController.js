const { CarsDb } = require("../models/database")
const { getAll, createOne } = require("./utils/handlerFactory")

module.exports.getAllCars = () => {
    const query = `SELECT Cars.CarName as name, Cars.CarID as id FROM Cars`

    return getAll(CarsDb, query)
}

module.exports.getCarModels = () => {
    const query = `SELECT Models.ModelID as id, Models.ModelName as name FROM Models WHERE Models.CarID=%{FOREIGN_ID}%`

    return getAll(CarsDb, query)
}

module.exports.addCar = () => {
    const getQuery = "SELECT Cars.CarID as id FROM Cars ORDER BY CarID DESC LIMIT 1"
    const insertQuery = `INSERT OR IGNORE INTO Cars (CarID, CarName) VALUES ("%{NEW_ID}%", "%{NAME}%")`
    const getNew = `SELECT Cars.CarName as name, Cars.CarID as id FROM Cars WHERE CarName="%{NAME}%"`

    return createOne(CarsDb, insertQuery, getQuery, getNew)
}

module.exports.addCarModel = () => {
    const getQuery = "SELECT Models.ModelID as id FROM Models ORDER BY ModelID DESC LIMIT 1"
    const insertQuery = `INSERT OR IGNORE INTO Models (ModelID, ModelName, CarID) VALUES ("%{NEW_ID}%", "%{NAME}%", "%{FOREIGN_ID}%")`
    const getNew = `SELECT Models.ModelName as name, Models.ModelID as id FROM Models WHERE ModelName="%{NAME}%"`

    return createOne(CarsDb, insertQuery, getQuery, getNew)
}

