import { reducerWithInitialState } from "typescript-fsa-reducers"
import { eventActions } from "../../actions/event"
import { Event } from "../../types/Event"

export interface EventIndexState {
    events: Event[]
}

export const initialState: EventIndexState = {
    events: []
}

export const EventIndexReducer = reducerWithInitialState(initialState)
    .case(eventActions.readEvents, (state: EventIndexState, events: Event[]) => {
        return { ...state, events: events }
    })
    .default((state: EventIndexState) => {
        return state
    })
