const fs = require("fs")
const { dialog } = require("electron")
const path = require("path")


const SaveFiles = (req, res, next) => {
  const {rows} = req.body
    const models = Array.from(new Set(rows.map(el => {return el[1]}))).filter((el)=> el)

    models.forEach((val)=> {
      //filter rows to get rows only for one model
      const model = rows.filter((row) => row[1] === val)

      //filename should be something like 'CarCarModel'...
      const filename = model[0].slice(0, 2).join('')

      //file text
      const str = model.map(row => row.slice(2).join(';')).join('\n')
      
      dialog.showSaveDialog({
        title: 'Выберите путь для сохранения файла',
        defaultPath: path.join(__dirname, `../savedFiles/${ filename }.csv`),
        buttonLabel: 'Сохранить',
        filters: [
            {
                name: filename,
                extensions: ['csv']
            },],
        properties: []
      }).then(file => {
          fs.writeFile(file.filePath.toString(), str, (err) => {
              if (err)  console.log(err)
          })
      })
    })

    res.status(200).json({
      status: 'success'
    })
}

module.exports = SaveFiles