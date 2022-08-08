import { connect } from "react-redux";
import { eventActions } from "../../actions/event";
import { EventIndex } from "../../components/event/EventIndex";
import { EventIndexState } from "../../reducers/event/eventIndex";
import { AppState } from "../../store";

export interface EventIndexHandler {
    readEvents(): void
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
