import { Dispatch } from "redux";
import actionCreatorFactory from "typescript-fsa";
import axios, { AxiosResponse } from "axios"
import { Event } from "../types/Event";
import { EventNewInputValues } from "../components/event/EventNew";
import { EventUpdateInputValues } from "../components/event/EventShow";

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
    },
    getEvent: actionCreator<AxiosResponse<Event>>('GET_EVENT'),
    getEventAsync: (id: string) => {
        return async (dispatch: Dispatch) => {
            const response: AxiosResponse<Event> = await axios.get(`${ROOT_URL}/events/${id}${QUERY_STRING}`)
            dispatch(eventActions.getEvent(response))
        }
    },
    updateEvent: actionCreator<AxiosResponse>('UPDATE_EVENT'),
    updateEventAsync: (id: string, values: EventUpdateInputValues) => {
        return async (dispatch: Dispatch) => {
            const response: AxiosResponse = await axios.put(`${ROOT_URL}/events/${id}${QUERY_STRING}`, values)
            dispatch(eventActions.updateEvent(response))
        }
    },
    deleteEvent: actionCreator<AxiosResponse>('DELETE_EVENT'),
    deleteEventAsync: (id: string) => {
        return async (dispatch: Dispatch) => {
            const response: AxiosResponse = await axios.delete(`${ROOT_URL}/events/${id}${QUERY_STRING}`)
            dispatch(eventActions.deleteEvent(response))
        }
    },
    
}
