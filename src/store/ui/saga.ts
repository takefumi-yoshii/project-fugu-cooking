import { fork, take, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import * as creators from './creators'
// ______________________________________________________
//
function* watch(): IterableIterator<any> {
  while (true) {
    yield take(LOCATION_CHANGE)
    yield put(creators.closeMenu())
  }
}
// ______________________________________________________
//
export default function*() {
  yield fork(watch)
}
