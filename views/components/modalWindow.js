import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// 'modal-root' is a sibling to 'app-root'
const modalRoot = document.getElementById('app');

const Pop = ({closeModal, ...props}) => {
    const [value, setValue] = useState('')
    const inputRef = useRef(null)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(()=> {
        //to focus on input
        inputRef.current.focus()
    }, [])

    return (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">{props.text}</h3>
                                <a onClick={closeModal} href="#close" title="Закрыть" className="close">×</a>
                            </div>
                            <div className="modal-body">
                                Введите наименование...
                                <input ref={inputRef} value={value} onChange={onChange} type="text" name="name"></input>
                                <button disabled={!value} 
                                        onClick={()=> props.send(value)}>
                                        Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
}

export const Modal = (props) => {
    //element to which the modal will be rendered

    return props.isOpen && createPortal(<Pop {...props}/>, modalRoot);
}
