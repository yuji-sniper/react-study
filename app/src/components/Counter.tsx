import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { countActions } from "../actions/countActions"
import { AppState } from "../store"

interface PropsInterface {
    value: number
}

interface DispatchProps {
    increment(): void
    decrement(): void
}

type PropsType = PropsInterface & DispatchProps

const Counter: React.FC<PropsType> = (props: PropsType) => {
    return (
        <React.Fragment>
            <div>value:{props.value}</div>
            <button onClick={() => props.increment()}>+1</button>
            <button onClick={() => props.decrement()}>-1</button>
        </React.Fragment>
    )
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

