import { DetectedBarcode } from '../../types'
import types from './types'
// ______________________________________________________
//
export function setDetectBarcodeEnabeled(flag: boolean) {
  return { type: types.SET_DETECT_BARCODE_ENABELED, payload: { flag } }
}
export function setDetectedBarcode(detectedBarcode: DetectedBarcode | null) {
  return {
    type: types.SET_DETECTED_BARCODE,
    payload: { detectedBarcode }
  }
}
