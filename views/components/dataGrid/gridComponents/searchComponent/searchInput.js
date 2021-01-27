import React, { useEffect, useRef, useState } from 'react';

export const SearchInput = ({filterItems, disabled}) =>  {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    useEffect(()=>{
        inputRef.current.focus()
    }, [])
    

    const onChange = (e) => {
        setInputValue(e.target.value)
        filterItems(inputValue)
    }

    return <input   className="SpreadsheetGridInput"
                    disabled={disabled} 
                    ref={inputRef} value={inputValue} 
                    onChange={onChange} 
                    type="text" 
                    name="search"/>
}