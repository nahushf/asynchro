import { createStore, compose, combineReducers } from 'redux';
import { loadingReducer } from '../src/reducer';

export function configureStore(initialState = {}) {
    let store = createStore<any>(
        combineReducers({
            loading: loadingReducer
        }),
        initialState
    );

    return store;
}

export const store = configureStore();
