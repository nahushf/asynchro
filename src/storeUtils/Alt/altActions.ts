import { alt } from './alt';

class Actions {
    dispatch: (...payload: any[]) => void

    asyncPending() {
        this.dispatch({isLoading: true, hasError: false})
    }

    asyncRejected() {
        this.dispatch({isLoading: false, hasError: true})
    }

    asyncSuccess() {
        this.dispatch({isLoading: false, hasError: false});
    }
}

export const actions = alt.createActions(Actions);