import { DetectedText } from '../../types'
import types from './types'
// ______________________________________________________
//
export function setDetectTextEnabeled(flag: boolean) {
  return { type: types.SET_DETECT_TEXT_ENABELED, payload: { flag } }
}
export function setDetectedText(detectedText: DetectedText | null) {
  return { type: types.SET_DETECTED_TEXT, payload: { detectedText } }
}
