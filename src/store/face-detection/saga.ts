import { fork, take, put, call, select } from 'redux-saga/effects'
import { DetectedFace } from '../../types'
import { StoreState } from '../index'
import * as creators from './creators'
import * as VideoCreators from '../video/creators'
import VideoTypes from '../video/types'
// ______________________________________________________
//
async function detect(faceDetector: any, element: HTMLVideoElement) {
  return await faceDetector.detect(element)
}
// ______________________________________________________
//
function* checkNativeAPI(): IterableIterator<any> {
  const isEnableAPI = window.FaceDetector !== undefined
  yield put(creators.setDetectFaceEnabeled(isEnableAPI))
}
function* detectShape(): IterableIterator<any> {
  while (true) {
    const {
      video: { element, currentVideoExperimentalAPI }
    }: StoreState = yield select()
    if (currentVideoExperimentalAPI !== 'FACE_DETECTION') break
    if (element !== null) {
      try {
        const faceDetector = new window.FaceDetector({
          fastMode: true,
          maxDetectedFaces: 1
        })
        const detectedFaces = yield call(detect, faceDetector, element)
        const detectedFace: DetectedFace | undefined = detectedFaces[0]
        if (detectedFace !== undefined) {
          yield put(creators.setDetectedFace(detectedFace))
        }
      } catch (err) {}
    }
  }
}
function* watchRequireUserMedia(): IterableIterator<any> {
  while (true) {
    const {
      payload: { currentVideoExperimentalAPI }
    }: ReturnType<typeof VideoCreators['onPlay']> = yield take(
      VideoTypes.ON_PLAY
    )
    if (currentVideoExperimentalAPI === 'FACE_DETECTION') {
      yield fork(detectShape)
    }
  }
}
// ______________________________________________________
//
export default function*() {
  yield fork(checkNativeAPI)
  yield fork(watchRequireUserMedia)
}
