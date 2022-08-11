import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { eventActions } from "../../actions/event";
import { AppState } from "../../store";
import { Event } from "../../types/Event";

interface Props {
    events: Event[]
    readEvents(): void
}

class EventIndex extends React.Component<Props> {
    componentDidMount() {
        this.props.readEvents()
    }

    render() {
        return (
            <React.Fragment>
                <Link to="/events/new">新規イベント</Link>
                <h1>「イベント一覧」</h1>
                {this.props.events.map((event) => {
                    return (
                        <div key={event.id}>
                            <h3>{event.id}：{event.title}</h3>
                            <p>{event.body}</p>
                            <hr></hr>
                        </div>
                    )
                })}
            </React.Fragment>
        )
    }
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
