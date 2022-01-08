import React from 'react'

const ColorSelector = props => {

    const renderOptions = colors => {
        if (!colors) {
            return
        }
        return (
            colors.map(color => (
                <option key={color} value={'#' + color} style={{backgroundColor: '#' + color}}>
                    {'#' + color}
                </option>
            ))
        )
    }
    return (
        <select className="ui dropdown" name="color" value={'#' + props.val} onChange={(e) => props.setter(e.target.value.slice(1))} style={{backgroundColor: props.val ? '#' + props.val : 'white'}}>
            <option disabled={props.firstDisabled} value="" style={{backgroundColor: 'white'}}>{props.defaultText}</option>
            {renderOptions(props.colors)}
        </select>
    )
}

export default ColorSelector