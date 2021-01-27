import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from '../../modalWindow';
import { SelectComponent } from './selectComponent/selectComponent';

export const Autocomplete = ({row, focus, postMethod, apiMethod, column, cb, condition, dependedParams, ...props}) => {
    const [items, setItems] = useState([])
    const [filtredItems, setFiltredItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const toggleModal = () => setModalOpen(!modalOpen);

    const modalPost = (name) => {
        if(postMethod){
            //sending post req to server, and update value
            postMethod(name, condition).then(res => {
                cb(row.id, column, dependedParams)(res.data)
            })
            //getting updated data from server
            apiMethod(condition).then(res => {
                setFiltredItems(res.data.data)
                setItems(res.data.data)
            })
            //close modal window
            setModalOpen(false)
        }
    }

    useEffect(()=> {
        if(condition !== null){
            apiMethod(condition).then(res => {
                setItems(res.data.data)
                setFiltredItems(res.data.data)
            })
        }
    }, [condition])

    const filterItems = (inputValue) => {
        setFiltredItems(items.filter(
            item => item.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        ))
    }

    useEffect(()=> {
        if(condition !== null) {
            //if condition is set get an API data
            apiMethod(condition).then(res => {
                setItems(res.data.data)
            })
        }
    }, [condition])

    return <Fragment>
                <SelectComponent
                    items={filtredItems}
                    selectedId={row[column] ? row[column].id : null}
                    isOpen={focus}
                    condition={condition}
                    onChange={cb(row.id, column, dependedParams)}
                    toggleModal={toggleModal}
                    filterItems={filterItems}
                />
                <Modal send={modalPost} text={column} closeModal={toggleModal} isOpen={modalOpen}></Modal>
            </Fragment>
}