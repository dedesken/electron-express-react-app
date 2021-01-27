const { AutoPartsDb } = require("../models/database")
const { getAll, createOne } = require("./utils/handlerFactory")

module.exports.getAllProds = () => {
    const query = `SELECT Prod.ProdID as id, Prod.ProdName as name FROM Prod`
    return getAll(AutoPartsDb, query)
}

module.exports.getAllAutoNodes = () => {
    const query = `SELECT Nodes.NodeID as id, Nodes.NodeName as name FROM Nodes`
    return getAll(AutoPartsDb, query)
}

module.exports.getAllParts = () => {
    const query = `SELECT Parts.PartID as id, Parts.PartName as name FROM Parts WHERE Parts.GroupID="%{FOREIGN_ID}%"`
    return getAll(AutoPartsDb, query)
}

module.exports.getNodeGroups = () => {
    const query = `SELECT NodeGroups.GroupID as id, NodeGroups.GroupName as name FROM NodeGroups 
    WHERE NodeGroups.NodeID=%{FOREIGN_ID}%`

    return getAll(AutoPartsDb, query)
}

module.exports.addProd = () => {
    const getQuery = "SELECT Prod.ProdID as id FROM Prod ORDER BY ProdID DESC LIMIT 1"
    const insertQuery = `INSERT OR IGNORE INTO Prod (ProdID, ProdName) VALUES ("%{NEW_ID}%", "%{NAME}%")`
    const getNew = `SELECT Prod.ProdName as name, Prod.ProdID as id FROM Prod WHERE ProdName="%{NAME}%"`

    return createOne(AutoPartsDb, insertQuery, getQuery, getNew)
}

module.exports.addAutoNode = () => {
    const getQuery = "SELECT Nodes.NodeID as id FROM Nodes ORDER BY NodeID DESC LIMIT 1"
    const insertQuery = `INSERT OR IGNORE INTO Nodes (NodeID, NodeName) VALUES ("%{NEW_ID}%", "%{NAME}%")`
    const getNew = `SELECT Nodes.NodeName as name, Nodes.NodeID as id FROM Nodes WHERE NodeName="%{NAME}%"`

    return createOne(AutoPartsDb, insertQuery, getQuery, getNew)
}

module.exports.addNodeGroup = () => {
    const getQuery = "SELECT NodeGroups.GroupID as id FROM NodeGroups ORDER BY GroupID DESC LIMIT 1"
    const insertQuery = `INSERT OR IGNORE INTO NodeGroups (GroupID, GroupName, NodeID) VALUES (%{NEW_ID}%, "%{NAME}%", %{FOREIGN_ID}%)`
    const getNew = `SELECT NodeGroups.GroupName as name, NodeGroups.GroupID as id FROM NodeGroups WHERE GroupName="%{NAME}%"`

    return createOne(AutoPartsDb, insertQuery, getQuery, getNew)
}

module.exports.addAutoPart = () => {
    const getQuery = "SELECT Parts.PartID as id FROM Parts ORDER BY PartID DESC LIMIT 1"
    const insertQuery = `INSERT OR IGNORE INTO Parts (PartID, PartName, GroupID) VALUES (%{NEW_ID}%, "%{NAME}%", %{FOREIGN_ID}%)`
    const getNew = `SELECT Parts.PartName as name, Parts.PartID as id FROM Parts WHERE PartName="%{NAME}%"`

    return createOne(AutoPartsDb, insertQuery, getQuery, getNew)
}