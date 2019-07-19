import { DetectedText } from '../../types'
import types from './types'
// ______________________________________________________
//
export const setDetectTextEnabeled = (flag: boolean) => ({
  type: types.SET_DETECT_TEXT_ENABELED,
  payload: { flag }
})
export const setDetectedText = (detectedText: DetectedText | null) => ({
  type: types.SET_DETECTED_TEXT,
  payload: { detectedText }
})
