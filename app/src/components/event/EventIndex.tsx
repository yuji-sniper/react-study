import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { eventActions } from "../../actions/eventActions";
import { AppState } from "../../store";
import { Event } from "../../types/Event";

interface Props {
    events: Event[]
    readEvents(): void
}

const EventIndex: React.FC<Props> = (props: Props) => {
    useEffect(() => {
        props.readEvents()
    }, [])

    return (
        <React.Fragment>
            <Link to="/events/new">新規イベント</Link>
            <h1>「イベント一覧」</h1>
            {props.events.map((event) => {
                return (
                    <div key={event.id}>
                        <h3>{event.id}</h3>
                        <p>
                            <Link to={`/event/${event.id}`}>
                                {event.title}
                            </Link>
                        </p>
                        <p>{event.body}</p>
                        <hr></hr>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

const mapStateToProps = (appState: AppState) => {
    return {
        events: appState.eventIndexState.events
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        readEvents: () => {
            dispatch(eventActions.readEventsAsync())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex)
