import { AxiosResponse } from "axios";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { eventActions } from "../../actions/eventActions";
import { Event } from "../../types/Event";

export interface EventShowState {
    event?: Event
}

const initialState: EventShowState = {}

export const EventShowReducer = reducerWithInitialState(initialState)
    .case(eventActions.getEvent, (state: EventShowState, response: AxiosResponse<Event>) => {
        return { ...state, event: response.data }
    })
    .default((state: EventShowState) => {
        return state
    })
