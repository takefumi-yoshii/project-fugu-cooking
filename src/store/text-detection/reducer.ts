import { Reducer } from 'redux'
import { DetectedText } from '../../types'
import { Actions } from '../actions'
// ______________________________________________________
//
type State = {
  detectedText: DetectedText | null
  isEnabledDetection: boolean | null
  playstate: string
}
// ______________________________________________________
//
export const initialStateFactory = (injects?: Partial<State>): State => ({
  detectedText: null,
  isEnabledDetection: null,
  playstate: 'pend',
  ...injects
})
// ______________________________________________________
//
export default (
  initialState = initialStateFactory()
): Reducer<State, Actions> => (state = initialState, action): State => {
  switch (action.type) {
    case 'SET_DETECT_TEXT_ENABELED':
      return { ...state, isEnabledDetection: action.payload.flag }
    case 'SET_DETECTED_TEXT':
      return { ...state, detectedText: action.payload.detectedText }
    default:
      return state
  }
}
