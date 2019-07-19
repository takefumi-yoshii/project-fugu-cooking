import { fork } from 'redux-saga/effects'
import UI from './ui/saga'
import Video from './video/saga'
import Pixi from './pixi/saga'
import BarcodeDetection from './barcode-detection/saga'
import TextDetection from './text-detection/saga'
import FaceDetection from './face-detection/saga'
// ______________________________________________________
//
export default function*() {
  yield fork(UI)
  yield fork(Video)
  yield fork(Pixi)
  yield fork(BarcodeDetection)
  yield fork(TextDetection)
  yield fork(FaceDetection)
}
