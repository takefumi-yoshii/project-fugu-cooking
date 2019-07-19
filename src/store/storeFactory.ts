import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas'
import { StoreState, Reducers } from './reducer'
// ______________________________________________________
//
export const history = createBrowserHistory()

export function storeFactory(reducers: Reducers): Store<StoreState> {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers(reducers),
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
