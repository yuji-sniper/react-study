import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { eventActions } from "../../actions/eventActions";
import { EventShowState } from "../../reducers/event/eventShowReducer";
import { AppState } from "../../store";

interface DispatchProps {
    deleteEvent(id: string): void
    initEventShowState(): void
}

type EventShowProps = EventShowState & DispatchProps

const EventShow: React.FC<EventShowProps> = (props: EventShowProps) => {
    useEffect(() => {
        props.initEventShowState()
    })

    const params = useParams()

    const onDeleteClick = () => {
        if (params.id) props.deleteEvent(params.id)
    }

    return (
        <React.Fragment>
            <h1>イベント詳細</h1>
            <div>
                <div>
                    <input type="button" value="削除" onClick={onDeleteClick} />
                    <Link to="/">キャンセル</Link>
                </div>
            </div>
            {props.deleted && (<Navigate to="/" />)}
        </React.Fragment>
    )
}

const mapStateToProps = (appState: AppState) => {
    return {
        event: appState.eventShowState.event,
        deleted: appState.eventShowState.deleted
    }
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        initEventShowState: () => {
            dispatch(eventActions.initEventShowState())
        },
        deleteEvent: (id: string) => {
            dispatch(eventActions.deleteEventAsync(id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventShow)
