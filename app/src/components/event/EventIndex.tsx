import React from "react";
import { EventIndexHandler } from "../../containers/event/EventIndexContainer";
import { EventIndexState } from "../../reducers/event/eventIndex";
import { Event } from "../../types/Event";

type PropsType = EventIndexState & EventIndexHandler

export class EventIndex extends React.Component<PropsType> {
    componentDidMount() {
        this.props.readEvents()
    }
    
    render() {
        return (
            <React.Fragment>
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
