module.exports.getAll = (db, query) => (req, res, next) => {
    const SqlQuery = query.replace(/%{FOREIGN_ID}%/, req.params.id)
    try {
        db.all(SqlQuery, (err, rows) => {
        if(err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: "success",
            data: rows
        })
    }) } catch(err) {
        res.json({
            message: "error",
            data: err.message
        })
    }
}

module.exports.createOne = (db, insertQuery, getQuery, getNew) => (req, res, next) => {
    let newId = null;
    const {name} = req.body

    db.get(getQuery, (err, row) => {
        if (err) {
            return res.status(400).json({error: err.message})
        }
        newId = row.id + 1

        const SqlQuery = insertQuery.replace(/%{NEW_ID}%/g, newId)
                                    .replace(/%{NAME}%/g, name.trim())
                                    .replace(/%{FOREIGN_ID}%/g, req.params.id) // if exist

        db.run(SqlQuery, (err) => {
            if (err) {
                return res.status(400).json({error: err.message})
            }
        })

        const getResult = getNew.replace(/%{NAME}%/g, name.trim())
                                .replace(/%{FOREIGN_ID}%/g, req.params.id) // if exist

        db.get(getResult, (err, row) => {
            return res.status(200).json({
                id: row.id,
                name: row.name
            })
        })
        
    });
}