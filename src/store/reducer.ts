import { Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { history } from './index'
import UI from './ui/reducer'
import Video from './video/reducer'
import Pixi from './pixi/reducer'
import BarcodeDetection from './barcode-detection/reducer'
import TextDetection from './text-detection/reducer'
import FaceDetection from './face-detection/reducer'
// ______________________________________________________
//
export type Reducers = typeof reducers
export type StoreState = {
  [K in keyof Reducers]: Reducers[K] extends Reducer<infer U, any> ? U : never
}
// ______________________________________________________
//
const reducers = {
  router: connectRouter(history),
  ui: UI(),
  video: Video(),
  pixi: Pixi(),
  barcodeDetection: BarcodeDetection(),
  textDetection: TextDetection(),
  faceDetection: FaceDetection()
}
export default reducers
