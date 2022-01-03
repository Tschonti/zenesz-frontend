import React from 'react'
import Loader from "react-loader-spinner"

import '../styles.css'

const MyLoader = () => {
    return (
        <div className="loader-container">
            <Loader
                type="Oval"
                color="#999897"
                visible
            />
            <p className="big-text">Betöltés...</p>
        </div>
    )
}

export default MyLoader