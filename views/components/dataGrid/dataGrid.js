
import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Input} from 'react-spreadsheet-grid'
import copyImg from '../../assets/copy.png'
import deleteImg from '../../assets/delete.png'
import Api from '../../helpers/api';
import { Autocomplete } from './gridComponents/autocompleteComponent';
import { GridImg } from './gridComponents/imgComponent';
import { addRow, copyRow, deleteRow, newRow, sendRows } from './utils';


export const DataGrid = () => {
    const [rows, setRows] = useState([{...newRow}]);

    const onFieldChange = (rowId, field, dependedParams) => (value) => {
        // Find the row that is being changed
        const row = rows.find(({ id }) => id === rowId);

        //if depended row parameter is set, reset it when value is changed
        if(dependedParams) {
            dependedParams.forEach(param => {
                row[param] = null
            });
        }

        // Change a value of a field
        row[field] = value;
        setRows([].concat(rows))
    }

    useEffect(()=>{
        const localStorageRows = localStorage.getItem('CashRows')

        if(localStorageRows) {
            setRows(JSON.parse(localStorageRows))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('CashRows', JSON.stringify(rows))
    }, [rows])

    return <Fragment> 
            <button onClick={()=>addRow(rows, setRows)}>Добавить строку</button>
            <button onClick={()=>{sendRows(rows, setRows)}}>Выгрузить данные</button>
            <Grid isScrollable={false}
                columns={[
                    {
                        id: 1,
                        width: 3,
                        title: () => '',
                        value: (row) => {
                            return <GridImg img={copyImg} cb={()=>copyRow(row, rows, setRows)}/>
                        }
                    }, {
                        id: 2,
                        width: 8,
                        title: () => 'Производитель',
                        value: (row, { focus }) => {
                            return <Autocomplete 
                                        row={row}
                                        focus={focus}  
                                        apiMethod={Api.getAllCars} 
                                        column={'Производитель'} 
                                        cb={onFieldChange}
                                        dependedParams={['Модель автомобиля']}
                                        postMethod={Api.addCar}
                                    />
                        }
                    }, {
                        id: 3,
                        title: () => 'Модель автомобиля',
                        value: (row, { focus }) => {
                            return <Autocomplete 
                                        row={row} 
                                        focus={focus} 
                                        apiMethod={Api.getCarModels} 
                                        column={'Модель автомобиля'} 
                                        cb={onFieldChange} 
                                        condition={row['Производитель']}
                                        postMethod={Api.addCarModel}
                                    />
                        }
                    }, {
                        id: 4,
                        title: () => 'Узел автомобиля',
                        value: (row, { focus }) => {
                            return <Autocomplete 
                                        row={row}
                                        focus={focus}  
                                        apiMethod={Api.getAllAutoNodes} 
                                        column={'Узел автомобиля'}
                                        cb={onFieldChange}
                                        dependedParams={['Группа запчастей', 'Наименование запчасти']}
                                        postMethod={Api.addAutoNode}
                                     />
                        }
                    }, {
                        id: 5,
                        title: () => 'Группа запчастей',
                        value: (row, { focus }) => {
                            return <Autocomplete 
                                        row={row} 
                                        focus={focus} 
                                        apiMethod={Api.getNodeGroups} 
                                        column={'Группа запчастей'} 
                                        cb={onFieldChange} 
                                        condition={row['Узел автомобиля']}
                                        postMethod={Api.addNodeGroup}
                                        dependedParams={['Наименование запчасти']}
                                    />
                        }
                    }, {
                        id: 6,
                        title: () => 'Наименование запчасти',
                        value: (row, { focus }) => {
                            return (
                                <Autocomplete 
                                    row={row}
                                    focus={focus}  
                                    apiMethod={Api.getParts} 
                                    column={'Наименование запчасти'} 
                                    cb={onFieldChange}
                                    condition={row['Группа запчастей']}
                                    postMethod={Api.addAutoPart} />
                            );
                        }
                    }, {
                        id: 7,
                        title: () => 'Производитель запчасти',
                        value: (row, { focus }) => {
                            return <Autocomplete 
                                        row={row}
                                        focus={focus}  
                                        apiMethod={Api.getAllProds} 
                                        column={'Производитель запчасти'}
                                        cb={onFieldChange}
                                        postMethod={Api.addProd} />
                        }
                    },  {
                        id: 8,
                        title: () => 'Номер запчасти',
                        value: (row, { focus }) => {
                            return (
                                <Input
                                    value={row['Номер запчасти']}
                                    focus={focus}
                                    onChange={onFieldChange(row.id, 'Номер запчасти')}
                                />
                            );
                        }
                    }, {
                        id: 9,
                        title: () => 'Применение',
                        value: (row, { focus }) => {
                            return (
                                <Input
                                    value={row['Применение']}
                                    focus={focus}
                                    onChange={onFieldChange(row.id, 'Применение')}
                                />
                            );
                        }
                    }, {
                        id: 10,
                        title: () => 'Примечание',
                        value: (row, { focus }) => {
                            return (
                                <Input
                                    value={row['Примечание']}
                                    focus={focus}
                                    onChange={onFieldChange(row.id, 'Примечание')}
                                />
                            );
                        }
                    }, {
                        id: 11,
                        title: () => 'OE',
                        value: (row, { focus }) => {
                            return (
                                <Input
                                    value={row['OE']}
                                    focus={focus}
                                    onChange={onFieldChange(row.id, 'OE')}
                                />
                            );
                        }
                    }, {
                        id: 12,
                        width: 3,
                        title: () => '',
                        value: (row) => {
                            return <GridImg img={deleteImg} cb={()=>deleteRow(row, rows, setRows)} />
                        }
                    },
                ]}
                rows={rows}
                getRowKey={row => row.id}
                focusOnSingleClick={true}
            />
    </Fragment>
}