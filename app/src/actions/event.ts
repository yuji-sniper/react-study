import { Action, Dispatch } from "redux";
import actionCreatorFactory, { AnyAction } from "typescript-fsa";
import axios, { AxiosResponse } from "axios"
import { Event } from "../types/Event";
import { EventNewInputValues } from "../components/event/EventNew";

const actionCreator = actionCreatorFactory()

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERY_STRING = '?token=token123'

export const eventActions = {
    readEvents: actionCreator<Event[]>('READ_EVENTS'),
    readEventsAsync: () => {
        return async (dispatch: Dispatch) => {
            const response: AxiosResponse<Event[]> = await axios.get(`${ROOT_URL}/events${QUERY_STRING}`)
            dispatch(eventActions.readEvents(response.data))
        }
    },
    createEvent: actionCreator<AxiosResponse<Event>>('CREATE_EVENT'),
    createEventAsync: (values: EventNewInputValues) => {
        return async (dispatch: Dispatch) => {
            const response: AxiosResponse<Event> = await axios.post(`${ROOT_URL}/events${QUERY_STRING}`, values)
            dispatch(eventActions.createEvent(response))
        }
    }
}
