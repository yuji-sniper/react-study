import { connect } from "react-redux"
import { Dispatch } from "redux"
import { countActions } from "../actions/countActions"
import { Counter } from "../components/Counter"
import { AppState } from "../store"

export interface CounterHandler {
    increment(): void
    decrement(): void
}

const mapStateToProps = (appState: AppState) => {
    return {
        value: appState.countState.value
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        increment: () => dispatch(countActions.increment()),
        decrement: () => dispatch(countActions.decrement())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
