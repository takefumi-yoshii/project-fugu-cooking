import { DetectedBarcode } from '../../types'
import types from './types'
// ______________________________________________________
//
export const setDetectBarcodeEnabeled = (flag: boolean) => ({
  type: types.SET_DETECT_BARCODE_ENABELED,
  payload: { flag }
})
export const setDetectedBarcode = (
  detectedBarcode: DetectedBarcode | null
) => ({
  type: types.SET_DETECTED_BARCODE,
  payload: { detectedBarcode }
})
