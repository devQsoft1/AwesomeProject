//---------- inports

// 3rd party lib
import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

//---------- saga for server request

// server request saga
export function* mySaga() {
  yield takeEvery("REQUEST_SERVER_FOR_DATA", requestSeveerForData);
}

// saga yield
function* requestSeveerForData(action) {

  try {
    const data = yield call(requestFromServer, action.payload);

    let new_payload = {
      request_payload: {
        ...action.payload
      },
      data_payload: {
        ...data,
        error: undefined
      }
    }
    yield put({ type: "SUCCESS_REQUEST_SERVER_FOR_DATA", payload: new_payload });
  } catch (e) {

    console.log('error : ', e)
    let new_payload = {
      request_payload: {
        ...action.payload
      },
      data_payload: {
        ...data,
        e
      }
    }
    yield put({ type: "SUCCESS_REQUEST_SERVER_FOR_DATA", data: new_payload });
  }
}


//---------- request to server for get / put / post / delete data

// base url
let base_url = 'https://myfakeapi.com/api/cars/'
let headers = {
  "Content-Type": "application/json",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65"
}


// server request
const requestFromServer = async (data) => {

  let server_url = base_url + (data.url || '')

  // get request
  if (data.type.toLowerCase() === 'get') {


    // request
    return await axios.get(server_url, headers)

      // success
      .then(res => {

        // console.log('res :', res)

        return {
          payload: res.data,
          error: undefined
        }
      })

      // error
      .catch(e => {
        // console.log('error :', e)

        return {
          payload: undefined,
          error: e,
        }
      })
  }
}

