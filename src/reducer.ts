import {
    LOADING,
    SUCCESS_STATE,
    LOADING_STATE,
    ERROR_STATE,
    SET_LOADING,
    SET_ERROR,
    SET_SUCCESS,
    RELOAD,
    UNSET_RELOAD
} from './actions';
import { fromJS } from 'immutable';
import { ILoadingAction } from "./interfaces";

export function loadingReducer(state = fromJS({}), { type, meta, payload, ...action }: ILoadingAction) {
    let typeTokens = type.split('/');
    switch (typeTokens[1]) {
        case LOADING:
            return state.set(meta.identifier, SUCCESS_STATE);
        case `${LOADING}_PENDING`:
            return state.set(meta.identifier, LOADING_STATE);
        case `${LOADING}_FULFILLED`:
            return state.set(meta.identifier, SUCCESS_STATE);
        case `${LOADING}_REJECTED`:
            return state.set(meta.identifier, ERROR_STATE);
        case SET_LOADING:
            return state.set(meta.identifier, LOADING_STATE);
        case SET_ERROR:
            return state.set(meta.identifier, ERROR_STATE);
        case SET_SUCCESS:
            return state.set(meta.identifier, SUCCESS_STATE);
        case RELOAD:
            return state.set(
                '$reload',
                [...state.get('$reload', []), action.identifier]
            );
        case UNSET_RELOAD:
            return state.set(
                '$reload',
                state.get('$reload', []).filter(val => val !== action.identifier)
            );
        default: return state;
    }
}
