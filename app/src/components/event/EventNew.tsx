import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ConfigProps, Field, InjectedFormProps, reduxForm, WrappedFieldProps } from "redux-form";
import { eventActions } from "../../actions/event";

export interface EventNewInputValues {
    title?: string
    body?: string
}

interface DispatchProps {
    createEvent(values: EventNewInputValues): void
}

type EventNewFormProps = InjectedFormProps<EventNewInputValues, DispatchProps> & DispatchProps

interface FieldProps extends WrappedFieldProps {
    label: string
    type: string
}

class EventNew extends React.Component<EventNewFormProps> {
    state = {
        isEventCreated: false
    }

    constructor(props: EventNewFormProps) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    renderField(field: FieldProps) {
        const { input, label, type, meta: { touched, error } } = field
        return (
            <div>
                <input {...input} placeholder={label} type={type}/>
                {touched && error && <span>{error}</span>}
            </div>
        )
    }

    async onSubmit(values: EventNewInputValues) {
        await this.props.createEvent(values)
        this.setState({ isEventCreated: true })
    }

    render() {
        const { handleSubmit } = this.props
        let { isEventCreated } = this.state
        return (
            <React.Fragment>
                <Link to="/">イベント一覧</Link>
                <h1>新規イベント作成</h1>
                {isEventCreated && (
                    <Navigate to="/" />
                )}
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <Field label="Title" name="title" type="text" component={this.renderField} />
                    </div>
                    <div>
                        <Field label="Body" name="body" type="text" component={this.renderField} />
                    </div>
                    <div>
                        <input type="submit" value="Submit" disabled={false}/>
                        <div>
                            <Link to="/">キャンセル</Link>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

/**
 * バリデーション
 */
const validate = (values: EventNewInputValues) => {
    const errors: {
        title?: string
        body?: string
    } = {}

    if (!values.title) errors.title = 'タイトルを入力してください'
    if (!values.body) errors.body = '内容を入力してください'

    return errors
}

const mapStateToProps = (): ConfigProps<EventNewInputValues, DispatchProps> => {
    return {
        form: 'eventNewForm',
        validate
    }
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        createEvent: (values: EventNewInputValues) => {
            dispatch(eventActions.createEventAsync(values))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm<EventNewInputValues, DispatchProps>({})(EventNew))
