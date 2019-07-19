import { DetectedFace } from '../../types'
import types from './types'
// ______________________________________________________
//
export function setDetectFaceEnabeled(flag: boolean) {
  return { type: types.SET_DETECT_FACE_ENABELED, payload: { flag } }
}
export function setDetectedFace(detectedFace: DetectedFace | null) {
  return { type: types.SET_DETECTED_FACE, payload: { detectedFace } }
}
