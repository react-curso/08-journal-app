import { types } from "../types/types";

export const setError = ( message ) => {
    return {
        type: types.uiSetError,
        payload: message
    }
}

export const removeError = (  ) => {
    return {
        type: types.uiRemoveError,
        payload: null
    }
}


export const startLoading = ( ) => {
    return {
        type: types.uiStartLoading,
        payload: true
    }
}
export const finishLoading = ( ) => {
    return {
        type: types.uiFinishLoading,
        payload: false
    }
}