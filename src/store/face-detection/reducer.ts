import { Reducer } from 'redux'
import { DetectedFace } from '../../types'
import { Actions } from '../actions'
// ______________________________________________________
//
type State = {
  detectedFace: DetectedFace | null
  isEnabledDetection: boolean | null
}
// ______________________________________________________
//
export const initialStateFactory = (injects?: Partial<State>): State => ({
  detectedFace: null,
  isEnabledDetection: null,
  ...injects
})
// ______________________________________________________
//
export default (
  initialState = initialStateFactory()
): Reducer<State, Actions> => (state = initialState, action): State => {
  switch (action.type) {
    case 'SET_DETECT_FACE_ENABELED':
      return { ...state, isEnabledDetection: action.payload.flag }
    case 'SET_DETECTED_FACE':
      return { ...state, detectedFace: action.payload.detectedFace }
    default:
      return state
  }
}
