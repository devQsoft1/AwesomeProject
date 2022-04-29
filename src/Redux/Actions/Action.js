//---------- imports

// action type
import {
    REQUEST_SERVER_FOR_DATA,
    SUCCESS_REQUEST_SERVER_FOR_DATA,
} from '../../Common/ActionTypes';

//---------- actions 

// request for data to server
export const requestServerForData = (data) => ({

    type: REQUEST_SERVER_FOR_DATA,
    payload: data
})

// response from server
export const requestServerSuccess = (data) => ({

    type: SUCCESS_REQUEST_SERVER_FOR_DATA,
    payload: data
})