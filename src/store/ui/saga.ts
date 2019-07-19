import { fork, take, put, call } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import * as creators from './creators'
// ______________________________________________________
//
function onResizeWindow() {
  return new Promise<{ innerWidth: number; innerHeight: number }>(resolve => {
    window.addEventListener(
      'resize',
      function() {
        resolve({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight
        })
      },
      { once: true }
    )
  })
}
function* watchWindowResize(): IterableIterator<any> {
  yield put(
    creators.onResizeWindow({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    })
  )
  while (true) {
    const payload: { innerWidth: number; innerHeight: number } = yield call(
      onResizeWindow
    )
    yield put(creators.onResizeWindow(payload))
  }
}
function* watchLocationChange(): IterableIterator<any> {
  while (true) {
    yield take(LOCATION_CHANGE)
    yield put(creators.resetDetectedBoundingBox())
    yield put(creators.closeMenu())
  }
}
// ______________________________________________________
//
export default function*() {
  yield fork(watchWindowResize)
  yield fork(watchLocationChange)
}
