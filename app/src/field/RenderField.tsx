import React from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldProps extends WrappedFieldProps {
    className: string
    label: string
    type: string
    disabled: boolean
}

export const RenderField: React.FC<FieldProps> = (props: FieldProps) => {
    const { className, label, type, input, disabled, meta: {touched, error} } = props

    return (
        <React.Fragment>
            { type === 'textarea' ? 
            <textarea className={className} placeholder={label} {...input}/>
            :
            <input className={className} placeholder={label} {...input} type={type}/>
            }
            { touched && error && <span>{error}</span> }
        </React.Fragment>
    )
}