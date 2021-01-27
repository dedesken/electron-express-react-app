import React, { useEffect, useRef, useState } from 'react';


export const DropdownComponent = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen)

    const dropdownElement = useRef(null)

    useEffect(()=>{
        return () => document.removeEventListener('click', onGlobalClick, false)
    }, [])

    useEffect(()=>{
        if(props.isOpen !== isOpen) setIsOpen(props.isOpen)
    }, [props.isOpen])

    const onGlobalClick = (event) => {
        if (!event.skipDropdownGlobalClick) {
            if (event.target !== dropdownElement.current && !dropdownElement.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
    }

    const onHeaderClick = () => {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    return (
            <div className="SpreadsheetGridDropdown">
                {
                    React.cloneElement(props.header, {
                        onClick: onHeaderClick
                    })
                }
                <div
                    ref={dropdownElement}
                    className="SpreadsheetGridDropdown__body"
                    style={{
                        display: isOpen
                            ? 'block'
                            : 'none'
                    }}
                >
                    {props.body}
                </div>
            </div>
        )
}