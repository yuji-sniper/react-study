import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ConfigProps, Field, InjectedFormProps, reduxForm, WrappedFieldProps } from "redux-form";
import { eventActions } from "../../actions/eventActions";
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

const EventNew: React.FC<EventNewFormProps> = (props: EventNewFormProps) => {
    const navigate = useNavigate()
    const { handleSubmit, pristine, invalid, submitting } = props

    const onSubmit = async (values: EventNewInputValues) => {
        await props.createEvent(values)
        navigate("/")
    }

    return (
        <React.Fragment>
            <Link to="/">イベント一覧</Link>
            <h1>新規イベント作成</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Field label="Title" name="title" type="text" component={RenderField} />
                </div>
                <div>
                    <Field label="Body" name="body" type="text" component={RenderField} />
                </div>
                <div>
                    <input type="submit" value="Submit" disabled={pristine || invalid || submitting}/>
                    <div>
                        <Link to="/">キャンセル</Link>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
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
        createEvent: async (values: EventNewInputValues) => {
            await dispatch(eventActions.createEventAsync(values))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm<EventNewInputValues, DispatchProps>({})(EventNew))
