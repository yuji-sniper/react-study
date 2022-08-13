import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory()

export const countActions = {
    increment: actionCreator('INCREMENT'),
    decrement: actionCreator('DECREMENT')
}
