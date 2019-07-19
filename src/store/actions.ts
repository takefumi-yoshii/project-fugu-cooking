import { Dispatch } from 'redux'
import * as UI from './ui/creators'
import * as Video from './video/creators'
import * as Pixi from './pixi/creators'
import * as BarcodeDetection from './barcode-detection/creators'
import * as TextDetection from './text-detection/creators'
import * as FaceDetection from './face-detection/creators'
// ______________________________________________________
//
type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...arg: any) => any ? ReturnType<T[K]> : never
}
type C2A<T> = Unwrap<ReturnTypes<T>>
// ______________________________________________________
//
export type Actions =
  | C2A<typeof UI>
  | C2A<typeof Video>
  | C2A<typeof Pixi>
  | C2A<typeof BarcodeDetection>
  | C2A<typeof TextDetection>
  | C2A<typeof FaceDetection>

export type Dispatcher = Dispatch<Actions>
