import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { CountState, CountReducer } from "./reducers/count"

export type AppState = {
    countState: CountState
}

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers<AppState>({
        countState: CountReducer
    }),
    storeEnhancers(applyMiddleware(thunk))
)

export default store
