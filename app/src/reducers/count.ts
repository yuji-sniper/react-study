import { reducerWithInitialState } from "typescript-fsa-reducers"
import { countActions } from "../actions/count"

export interface CountState {
    value: number
}

export const initialState: CountState = {
    value: 0
}

export const CountReducer = reducerWithInitialState(initialState)
    .case(countActions.increment, (state: CountState) => {
        return { ...state, value: state.value + 1 }
    })
    .case(countActions.decrement, (state: CountState) => {
        return { ...state, value: state.value - 1 }
    })
    .default((state: CountState) => {
        return state
    })
