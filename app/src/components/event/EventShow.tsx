import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ConfigProps, Field, InjectedFormProps, reduxForm } from "redux-form";
import { eventActions } from "../../actions/eventActions";
import { RenderField } from "../../field/RenderField";
import { EventShowState } from "../../reducers/event/eventShowReducer";
import { AppState } from "../../store";
import { InputValues, validateForm } from "../../validation/validation";

export interface EventUpdateInputValues extends InputValues {
    title?: string
    body?: string
}

interface DispatchProps {
    getEvent(id: string): void
    updateEvent(id: string, values: EventUpdateInputValues): void
    deleteEvent(id: string): void
}

type Props = EventShowState & DispatchProps

type EventShowProps = InjectedFormProps<EventUpdateInputValues, Props> & Props

const EventShow: React.FC<EventShowProps> = (props: EventShowProps) => {
    const params = useParams()
    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)
    const { handleSubmit, pristine, invalid, submitting } = props

    useEffect(() => {
        props.getEvent(params.id!)
    }, [])

    const onDeleteClick = async () => {
        setDeleting(true)
        await props.deleteEvent(params.id!)
        navigate("/")
    }

    const onSubmit = async (values: EventUpdateInputValues) => {
        await props.updateEvent(params.id!, values)
        navigate("/")
    }

    return (
        <React.Fragment>
            <h1>イベント詳細</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Field label="Title" name="title" type="text" component={RenderField} />
                </div>
                <div>
                    <Field label="Body" name="body" type="text" component={RenderField} />
                </div>
                <div>
                    <input type="submit" value="更新" disabled={pristine || invalid || submitting} />
                    <input type="button" value="削除" disabled={deleting} onClick={onDeleteClick} />
                    <Link to="/">キャンセル</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

const validate = (values: EventUpdateInputValues) => {
    return validateForm<EventUpdateInputValues>(values, {
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


const mapStateToProps = (appState: AppState): ConfigProps<EventUpdateInputValues, Props> & EventShowState => {
    const state = appState.eventShowState
    return {
        form: 'eventUpdateForm',
        validate,
        initialValues: {
            title: state.event?.title,
            body: state.event?.body
        },
        enableReinitialize: true,
        event: state.event,
    }
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        getEvent: async (id: string) => {
            await dispatch(eventActions.getEventAsync(id))
        },
        updateEvent: async (id: string, values: EventUpdateInputValues) => {
            await dispatch(eventActions.updateEventAsync(id, values))
        },
        deleteEvent: async (id: string) => {
            await dispatch(eventActions.deleteEventAsync(id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm<EventUpdateInputValues, Props>({})(EventShow))
