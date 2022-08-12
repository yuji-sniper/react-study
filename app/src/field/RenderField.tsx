import React from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldProps extends WrappedFieldProps {
    className: string
    type: string
    disabled: boolean
}

export class RenderField extends React.Component<FieldProps> {
    render() {
        const { className, type, input, disabled, meta: {touched, error} } = this.props
        return (
            <React.Fragment>
                { type === 'textarea' ? 
                <textarea className={className} {...input}/>
                :
                <input className={className} {...input} type={type}/>
                }
                { touched && error && <span>{error}</span> }
            </React.Fragment>
        )
    }
}