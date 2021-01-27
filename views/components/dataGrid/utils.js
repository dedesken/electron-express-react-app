import Api from "../../helpers/api";

export const newRow = {
    id: 1,
    'Производитель': null,
    'Модель автомобиля': null,
    'Узел автомобиля': null,
    'Группа запчастей': null,
    'Наименование запчасти': null,
    'Производитель запчасти': null,
    'Номер запчасти': '',
    'Применение': '',
    'Примечание': '',
    'OE': ''
};

export const addRow = (rows, setRows) => {
    let id
    if (rows[rows.length - 1].id > rows[0].id) {
        id = rows[rows.length - 1].id + 1
    } else {
        id = rows[0].id + 1
    }
    setRows([{...newRow, id: id}, ...rows])
}

export const copyRow = (row, rows, setRows) => {
    let newId
    if (rows[rows.length - 1].id > rows[0].id) {
        newId = rows[rows.length - 1].id + 1
    } else {
        newId = rows[0].id + 1
    }
    setRows([{ ...row, id: newId }, ...rows])
}

export const deleteRow = (row, rows, setRows) => {
    if (rows.length > 1) {
        
        const rowIndex = rows.findIndex(item => item.id === row.id)
        
        const newRows = [...rows]
        newRows.splice(rowIndex, 1)
        
        setRows(newRows)
    }
}

export const sendRows = (rows, setRows) => {
    //getting an array of arrays containing only string values
    const toArrayOfStrings = (item) => {
        //get array of string values for current row only and skip 'id' parametr
        return Object.keys(item).filter(el=> el !== 'id').map(el => {
            //if parametr value not set return empty string
            if(item[el] === null) return '';

            //if parametr type is object return parametr.name
            if(typeof item[el] === "object") {
                return item[el].name
            }
            
            //by default return parametr value
            return item[el]
        })
    }

    const data = rows.map(toArrayOfStrings)

    //Sending data to Api, and then reset tabel...
    Api.saveFiles(data).then(res => setRows([{...newRow}]))
}