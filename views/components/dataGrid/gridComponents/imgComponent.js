import React from 'react'

export const GridImg = ({img, cb}) => {
    return (
        <img alt="" onClick={cb} src={img} style={{ width: '100%' }}></img>
    );
}