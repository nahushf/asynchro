import { SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../constants';
import { fromJS } from 'immutable';

const LOADING_STATE = { isLoading: true, hasError: false };
const SUCCESS_STATE = { isLoading: false, hasError: false };
const ERROR_STATE = { isLoading: false, hasError: true };

export function asyncReducer(state = fromJS({}), {type, identifier}) {

    switch (type.split('/')[0]) {
        case SET_LOADING:
            return state.set(identifier, LOADING_STATE);
        case SET_ERROR:
            return state.set(identifier, ERROR_STATE);
        case SET_SUCCESS:
            return state.set(identifier, SUCCESS_STATE);
        default:
            return state;
    }

}
