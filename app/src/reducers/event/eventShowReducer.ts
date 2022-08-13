import { AxiosResponse } from "axios";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { eventActions } from "../../actions/eventActions";
import { Event } from "../../types/Event";

export interface EventShowState {
    event?: Event
    deleted: boolean
}

const initialState: EventShowState = {
    deleted: false
}

export const EventShowReducer = reducerWithInitialState(initialState)
    .case(eventActions.initEventShowState, (state: EventShowState) => {
        return { ...state, event: undefined, deleted: false }
    })
    .case(eventActions.deleteEvent, (state: EventShowState, response: AxiosResponse) => {
        return { ...state, deleted: (response.status === 200) }
    })
    .default((state: EventShowState) => {
        return state
    })
