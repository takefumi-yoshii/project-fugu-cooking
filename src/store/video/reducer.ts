import { Reducer } from 'redux'
import { Actions } from '../actions'
// ______________________________________________________
//
export type PlayState = 'canplay' | 'play' | 'pause' | null

export type CurrentDetectionAPI =
  | 'BARCODE_DETECTION'
  | 'TEXT_DETECTION'
  | 'FACE_DETECTION'
  | null

type State = {
  element: HTMLVideoElement | null
  stream: MediaStream | null
  playState: PlayState
  currentDetectionAPI: CurrentDetectionAPI
  isDisabledUserMedia: boolean | null
}
// ______________________________________________________
//
export const initialStateFactory = (injects?: Partial<State>): State => ({
  element: null,
  stream: null,
  playState: null,
  currentDetectionAPI: null,
  isDisabledUserMedia: null,
  ...injects
})
// ______________________________________________________
//
export default (
  initialState = initialStateFactory()
): Reducer<State, Actions> => (state = initialState, action): State => {
  switch (action.type) {
    case 'VIDEO_REQUIRE_USER_MEDIA':
      return {
        ...state,
        currentDetectionAPI: action.payload.currentDetectionAPI
      }
    case 'VIDEO_SET_VIDEO_ELEMENT':
      return { ...state, element: action.payload.element }
    case 'VIDEO_SET_MEDIA_STREAM':
      return { ...state, stream: action.payload.stream }
    case 'VIDEO_SET_IS_DISABLED_USER_MEDIA':
      return { ...state, isDisabledUserMedia: action.payload.flag }
    case 'VIDEO_ON_CAN_PLAY':
    case 'VIDEO_ON_PAUSE':
    case 'VIDEO_ON_PLAY':
      return { ...state, playState: action.payload.playState }
    default:
      return state
  }
}
