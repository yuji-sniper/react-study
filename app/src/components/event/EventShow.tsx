import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
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
    deleteEvent(id: string): void
    initEventShow(id: string): void
}

type Props = EventShowState & DispatchProps

type EventShowProps = InjectedFormProps<EventUpdateInputValues, Props> & Props

const EventShow: React.FC<EventShowProps> = (props: EventShowProps) => {
    const params = useParams()

    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        props.initEventShow(params.id!)
    }, [])

    const onDeleteClick = async () => {
        await props.deleteEvent(params.id!)
        setDeleted(true)
    }

    return (
        <React.Fragment>
            <h1>イベント詳細</h1>
            <form>
                <div>
                    <Field label="Title" name="title" type="text" component={RenderField} />
                </div>
                <div>
                    <Field label="Body" name="body" type="text" component={RenderField} />
                </div>
                <div>
                    <input type="button" value="削除" onClick={onDeleteClick} />
                    <Link to="/">キャンセル</Link>
                </div>
            </form>
            {deleted && (<Navigate to="/" />)}
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
        initEventShow: async (id: string) => {
            await dispatch(eventActions.initEventShowAsync(id))
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
