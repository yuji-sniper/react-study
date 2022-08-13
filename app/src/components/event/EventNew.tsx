import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ConfigProps, Field, InjectedFormProps, reduxForm, WrappedFieldProps } from "redux-form";
import { eventActions } from "../../actions/event";
import { RenderField } from "../../field/RenderField";
import { InputValues, validateForm } from "../../validation/validation";

export interface EventNewInputValues extends InputValues {
    title?: string
    body?: string
}

interface DispatchProps {
    createEvent(values: EventNewInputValues): void
}

type EventNewFormProps = InjectedFormProps<EventNewInputValues, DispatchProps> & DispatchProps

class EventNew extends React.Component<EventNewFormProps> {
    state = {
        isEventCreated: false
    }

    constructor(props: EventNewFormProps) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async onSubmit(values: EventNewInputValues) {
        await this.props.createEvent(values)
        this.setState({ isEventCreated: true })
    }

    render() {
        const { handleSubmit, invalid, submitting } = this.props
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
                        <Field label="Title" name="title" type="text" component={RenderField} />
                    </div>
                    <div>
                        <Field label="Body" name="body" type="text" component={RenderField} />
                    </div>
                    <div>
                        <input type="submit" value="Submit" disabled={invalid || submitting}/>
                        <div>
                            <Link to="/">キャンセル</Link>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

const validate = (values: EventNewInputValues) => {
    return validateForm<EventNewInputValues>(values, {
        title: {
            required: { message: 'タイトルを入力してください' },
            min: { param: 3, message: 'タイトルは:min文字以上で入力してください' },
            max: { param: 10, message: 'タイトルは:max文字以内で入力してください' }
        },
        body: {
            required: { message: 'ボディを入力してください' },
            min: { param: 5, message: 'ボディは:min文字以上で入力してください' },
            max: { param: 12, message: 'ボディは:max文字以内で入力してください' }
        }
    })
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
