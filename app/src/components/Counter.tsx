import React from "react"
import { CounterHandler } from "../containers/CounterContainer"

interface PropsInterface {
    value: number
}

type PropsType = PropsInterface & CounterHandler

export class Counter extends React.Component<PropsType> {
    render() {
        return (
            <React.Fragment>
                <div>value:{this.props.value}</div>
                <button onClick={() => this.props.increment()}>+1</button>
                <button onClick={() => this.props.decrement()}>-1</button>
            </React.Fragment>
        )
    }
}
