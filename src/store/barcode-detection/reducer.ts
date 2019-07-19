import { Reducer } from 'redux'
import { DetectedBarcode } from '../../types'
import { Actions } from '../actions'
// ______________________________________________________
//
type State = {
  detectedBarcode: DetectedBarcode | null
  detectedRawValueIsURL: boolean | null
  isEnabledDetection: boolean | null
}
// ______________________________________________________
//
export const initialStateFactory = (injects?: Partial<State>): State => ({
  detectedBarcode: null,
  detectedRawValueIsURL: null,
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
      let detectedRawValueIsURL = false
      if (action.payload.detectedBarcode) {
        const { rawValue } = action.payload.detectedBarcode
        detectedRawValueIsURL =
          rawValue.match(
            /^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/
          ) !== null
      }
      return {
        ...state,
        detectedBarcode: action.payload.detectedBarcode,
        detectedRawValueIsURL
      }
    default:
      return state
  }
}
