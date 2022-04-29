// redux
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

// saga
import { mySaga } from '../Saga/Saga'

// reducre
import reducer from '../Reducers/Reducer'

// create middleware
const sagaMiddleware = createSagaMiddleware()

// export store
export const Store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// run saga
sagaMiddleware.run(mySaga)
