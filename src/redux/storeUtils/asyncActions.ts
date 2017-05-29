import { SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../constants/actions';

function generateSetAction(type: string) {
    return (identifier) => ({
        type,
        identifier
    });
}

export const setLoading = generateSetAction(SET_LOADING);
export const setError = generateSetAction(SET_ERROR);
export const setSuccess = generateSetAction(SET_SUCCESS);
