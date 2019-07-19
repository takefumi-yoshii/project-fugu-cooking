import { fork, take, put, call, select } from 'redux-saga/effects'
import { DetectedBarcode } from '../../types'
import { StoreState } from '../index'
import * as creators from './creators'
import * as VideoCreators from '../video/creators'
import VideoTypes from '../video/types'
// ______________________________________________________
//
async function detect(barcodeDetector: any, element: HTMLVideoElement) {
  return await barcodeDetector.detect(element)
}
// ______________________________________________________
//
function* checkNativeAPI(): IterableIterator<any> {
  const isEnableAPI = window.BarcodeDetector !== undefined
  yield put(creators.setDetectBarcodeEnabeled(isEnableAPI))
}
function* detectShape(): IterableIterator<any> {
  while (true) {
    const {
      video: { element, currentVideoExperimentalAPI }
    }: StoreState = yield select()
    if (currentVideoExperimentalAPI !== 'BARCODE_DETECTION') break
    if (element !== null) {
      try {
        const barcodeDetector = new window.BarcodeDetector()
        const detectedBarcodes = yield call(detect, barcodeDetector, element)
        const detectedBarcode: DetectedBarcode | undefined = detectedBarcodes[0]
        if (detectedBarcode !== undefined) {
          yield put(creators.setDetectedBarcode(detectedBarcode))
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
    if (currentVideoExperimentalAPI === 'BARCODE_DETECTION') {
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
