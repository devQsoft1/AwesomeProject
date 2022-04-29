//---------- imports

// action type
import {
    REQUEST_SERVER_FOR_DATA,
    SUCCESS_REQUEST_SERVER_FOR_DATA,
} from '../../Common/ActionTypes';

// veriables
let pocket_data_key
let url
let data
// initial state
const INIT_STATE = {
    error: undefined,
    loading: true,
}

//---------- export reducre with actions

export default (state = INIT_STATE, action) => {

    switch (action.type) {

        // server request
        case REQUEST_SERVER_FOR_DATA:

            pocket_data_key = action.payload.key
            url = action.payload.url

            return ({
                ...state, [pocket_data_key]: action.payload,
            })
            break;

        // response of server
        case SUCCESS_REQUEST_SERVER_FOR_DATA:

            pocket_data_key = action.payload?.request_payload?.key

            return ({
                ...state, [pocket_data_key]: action.payload, loading: false, error: action.payload?.data_payload?.error
            })
            break;

        default:
            break;
    }
}