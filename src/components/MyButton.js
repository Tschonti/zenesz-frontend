import React from 'react'

const MyButton = props => {

    const icons = props.icons.map((icon, idx) => <i key={idx} className={`icon ${icon}`}></i>)
    return (
        <button data-tip={props.tip} aria-label={props.tip} className={`ui button my-button icon ${props.color}`} onClick={props.onClick} disabled={props.disabled} >{icons}{props.text}</button>
    )
}

export default MyButton