import { LOADING, SET_ERROR, SET_LOADING, SET_SUCCESS, UNSET_RELOAD, RELOAD } from './actions';
import { IAction } from './interfaces';

/** Shape of the loading data for the [Async]{@linkcode Async} component in the store. */
export interface ILoadingData {
    isLoading: boolean;
    hasError: boolean;
}

export function executePromiseAction(promise, identifier, dispatch) {
    if (!promise && !promise.then) {
        dispatch(setSuccess(identifier));
        return;
    }

    dispatch(setLoading(identifier))
    promise.then(
        () => dispatch(setSuccess(identifier)),
        e => {
            dispatch(setError(identifier));
            throw e;
        }
    )
    // return {
    //     type: `${identifier}/${LOADING}`,
    //     payload: {
    //         promise
    //     },
    //     meta: {
    //         identifier,
    //     }
    // };
}

/** Used to set the loading state of a particular component to loading. */
export function setLoading(identifier: string) {
    return {
        type: `${identifier}/${SET_LOADING}`,
        meta: { identifier }
    };
}

/** Used to set the loading state of a particular component to error. */
export function setError(identifier: string) {
    return {
        type: `${identifier}/${SET_ERROR}`,
        meta: { identifier }
    };
}

/** Used to set the loading state of a particular component to success. */
export function setSuccess(identifier: string) {
    return {
        type: `${identifier}/${SET_SUCCESS}`,
        meta: { identifier }
    };
}

export function reload(identifier: string) {
    return {
        type: `${identifier}/${RELOAD}`,
        identifier
    };
}

export function unsetReload(identifier: string) {
    return {
        type: `${identifier}/${UNSET_RELOAD}`,
        identifier
    };
}
