import React from 'react'
import './Button.scss'

const Button = ({ label, onClick }) => {
    return (

        <button className="core__btn" onClick={onClick}>{label}</button>

    )
}

export default Button