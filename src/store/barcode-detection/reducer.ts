import { Reducer } from 'redux'
import { DetectedBarcode } from '../../types'
import { Actions } from '../actions'
// ______________________________________________________
//
type State = {
  detectedBarcode: DetectedBarcode | null
  isEnabledDetection: boolean | null
}
// ______________________________________________________
//
export const initialStateFactory = (injects?: Partial<State>): State => ({
  detectedBarcode: null,
  isEnabledDetection: null,
  ...injects
})
// ______________________________________________________
//
export default (
  initialState = initialStateFactory()
): Reducer<State, Actions> => (state = initialState, action): State => {
  switch (action.type) {
    case 'SET_DETECT_BARCODE_ENABELED':
      return { ...state, isEnabledDetection: action.payload.flag }
    case 'SET_DETECTED_BARCODE':
      return { ...state, detectedBarcode: action.payload.detectedBarcode }
    default:
      return state
  }
}
