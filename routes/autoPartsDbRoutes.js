const express = require('express')
const { getAllProds, getAllAutoNodes, getNodeGroups, addProd, addAutoNode, addNodeGroup, getAllParts, addAutoPart } = require('../controllers/autoPartsController')

const router = express.Router()

router.get('/', getAllProds())
router.post('/', addProd())
router.get('/nodes', getAllAutoNodes())
router.post('/nodes', addAutoNode())
router.get('/nodes/:id', getNodeGroups())
router.post('/nodes/:id', addNodeGroup())
router.get('/:id', getAllParts())
router.post('/add/:id', addAutoPart())

module.exports = router