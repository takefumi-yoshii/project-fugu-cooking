import { Reducer } from 'redux'
import { Actions } from '../actions'
// ______________________________________________________
//
type State = {
  isOpenMenu: boolean
  visibleDetectedRect: boolean
  detectedBoundingBox: DOMRect | null
}
// ______________________________________________________
//
export const initialStateFactory = (injects?: Partial<State>): State => ({
  isOpenMenu: false,
  visibleDetectedRect: true,
  detectedBoundingBox: null,
  ...injects
})
// ______________________________________________________
//
export default (
  initialState = initialStateFactory()
): Reducer<State, Actions> => (state = initialState, action): State => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isOpenMenu: !state.isOpenMenu }
    case 'CLOSE_MENU':
      return { ...state, isOpenMenu: false }
    case 'TOGGLE_VISIBLE_DETECTED_RECT':
      return { ...state, visibleDetectedRect: !state.visibleDetectedRect }
    case 'SET_DETECTED_BARCODE':
      const { detectedBarcode } = action.payload
      if (!detectedBarcode) return state
      return { ...state, detectedBoundingBox: detectedBarcode.boundingBox }
    case 'SET_DETECTED_TEXT':
      const { detectedText } = action.payload
      if (!detectedText) return state
      return { ...state, detectedBoundingBox: detectedText.boundingBox }
    case 'SET_DETECTED_FACE':
      const { detectedFace } = action.payload
      if (!detectedFace) return state
      return { ...state, detectedBoundingBox: detectedFace.boundingBox }
    case 'RESET_DETECTED_BOUNDING_BOX':
        return { ...state, detectedBoundingBox: null }
    default:
      return state
  }
}
