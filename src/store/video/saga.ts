import { fork, take, put, call, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { StoreState } from '../index'
import { CurrentVideoExperimentalAPI } from './reducer'
import * as creators from './creators'
import types from './types'
// ______________________________________________________
//
function* watchCanPlay(
  video: HTMLVideoElement,
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
) {
  yield call(
    (video: HTMLVideoElement) =>
      new Promise<Event>(resolve => {
        video.oncanplay = event => resolve(event)
      }),
    video
  )
  yield put(
    creators.onCanPlay({ playState: 'canplay', currentVideoExperimentalAPI })
  )
  video.play()
}

function* watchOnPlay(
  video: HTMLVideoElement,
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
) {
  yield call(
    (video: HTMLVideoElement) =>
      new Promise<Event>(resolve => {
        video.onplay = event => resolve(event)
      }),
    video
  )
  yield put(creators.onPlay({ playState: 'play', currentVideoExperimentalAPI }))
}

function* watchOnPause(
  video: HTMLVideoElement,
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
) {
  yield call(
    (video: HTMLVideoElement) =>
      new Promise<Event>(resolve => {
        video.onpause = event => resolve(event)
      }),
    video
  )
  yield put(
    creators.onPause({ playState: 'pause', currentVideoExperimentalAPI })
  )
}

async function getUserMedia(constraints?: MediaStreamConstraints) {
  return await navigator.mediaDevices.getUserMedia(constraints)
}
// ______________________________________________________
//
function* watchRequiredUserMedia(): IterableIterator<any> {
  while (true) {
    yield take(types.SET_VIDEO_ELEMENT)
    const {
      video: { element }
    }: StoreState = yield select()
    try {
      if (element !== null) {
        const {
          payload: { constraints, currentVideoExperimentalAPI }
        }: ReturnType<typeof creators['requireUserMedia']> = yield take(
          types.REQUIRE_USER_MEDIA
        )
        const stream: MediaStream = yield call(getUserMedia, constraints)
        yield put(creators.setMediaStream(stream))
        element.srcObject = stream
        yield fork(watchCanPlay, element, currentVideoExperimentalAPI)
        yield fork(watchOnPlay, element, currentVideoExperimentalAPI)
        yield fork(watchOnPause, element, currentVideoExperimentalAPI)
      }
    } catch (err) {
      yield put(creators.setIsDisabledUserMedia(true))
    }
  }
}
function* watchDispose(): IterableIterator<any> {
  while (true) {
    yield take(LOCATION_CHANGE)
    const {
      video: { stream }
    }: StoreState = yield select()
    if (stream !== null) {
      const track = stream.getTracks()[0]
      track.stop()
      yield put(creators.setVideoElement(null))
    }
  }
}
// ______________________________________________________
//
export default function*() {
  yield fork(watchRequiredUserMedia)
  yield fork(watchDispose)
}
