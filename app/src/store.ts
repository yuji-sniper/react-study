import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import * as ReduxForm from "redux-form";
import thunk from "redux-thunk";
import { CountReducer, CountState } from "./reducers/count"
import { EventIndexReducer, EventIndexState } from "./reducers/event/eventIndexReducer";

export type AppState = {
    countState: CountState
    eventIndexState: EventIndexState
}

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        form: ReduxForm.reducer,
        countState: CountReducer,
        eventIndexState: EventIndexReducer
    }),
    storeEnhancers(applyMiddleware(thunk))
)

export default store
