import { fork, take, put, call, select } from 'redux-saga/effects'
import { DetectedText } from '../../types'
import { StoreState } from '../index'
import * as creators from './creators'
import * as VideoCreators from '../video/creators'
import VideoTypes from '../video/types'
// ______________________________________________________
//
async function detect(textDetector: any, element: HTMLVideoElement) {
  return await textDetector.detect(element)
}
// ______________________________________________________
//
function* checkNativeAPI(): IterableIterator<any> {
  const isEnableAPI = window.TextDetector !== undefined
  yield put(creators.setDetectTextEnabeled(isEnableAPI))
}
function* detectShape(): IterableIterator<any> {
  while (true) {
    const {
      video: { element, currentDetectionAPI }
    }: StoreState = yield select()
    if (currentDetectionAPI !== 'TEXT_DETECTION') break
    if (element !== null) {
      try {
        const textDetector = new window.TextDetector()
        const detectedTexts = yield call(detect, textDetector, element)
        const detectedText: DetectedText | undefined = detectedTexts[0]
        if (detectedText !== undefined) {
          yield put(creators.setDetectedText(detectedText))
        }
      } catch (err) {}
    }
  }
}
function* watchRequireUserMedia(): IterableIterator<any> {
  while (true) {
    const {
      payload: { currentDetectionAPI }
    }: ReturnType<typeof VideoCreators['onPlay']> = yield take(
      VideoTypes.ON_PLAY
    )
    if (currentDetectionAPI === 'TEXT_DETECTION') {
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
