import React from 'react'

export default function Input({
    type = "text",
    className = "",
    ...props
}) {
    return (
        <input type={type} {...props} className={`form-control ${className}`} />
    )
}
