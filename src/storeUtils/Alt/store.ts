import { actions } from './altActions';
import { alt } from './alt';
import { IAsyncState } from "../../interfaces";

class AsyncStore {
    states: {[key: string]: IAsyncState}[]
    constructor() {
        this.states = [];
    }

    handleStateChange() {
        
    }
}

export const store = alt.createStore(AsyncStore);