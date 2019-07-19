import { DetectedFace } from '../../types'
import types from './types'
// ______________________________________________________
//
export const setDetectFaceEnabeled = (flag: boolean) => ({
  type: types.SET_DETECT_FACE_ENABELED,
  payload: { flag }
})
export const setDetectedFace = (detectedFace: DetectedFace | null) => ({
  type: types.SET_DETECTED_FACE,
  payload: { detectedFace }
})
