import React from 'react'

const Button = (props : React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button type="button"
                className="btn btn-primary"
                {...props}>
            Primary
        </button>
    )
}

export default Button
