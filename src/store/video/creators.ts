import types from './types'
import { PlayState, CurrentDetectionAPI } from './reducer'
// ______________________________________________________
//
export const requireUserMedia = (payload: {
  constraints: MediaStreamConstraints
  currentDetectionAPI: CurrentDetectionAPI
}) => ({
  type: types.REQUIRE_USER_MEDIA,
  payload
})
export const setVideoElement = (element: HTMLVideoElement | null) => ({
  type: types.SET_VIDEO_ELEMENT,
  payload: { element }
})
export const setMediaStream = (stream: MediaStream) => ({
  type: types.SET_MEDIA_STREAM,
  payload: { stream }
})
export const setIsDisabledUserMedia = (flag: boolean) => ({
  type: types.SET_IS_DISABLED_USER_MEDIA,
  payload: { flag }
})
export const onCanPlay = (payload: {
  playState: PlayState
  currentDetectionAPI: CurrentDetectionAPI
}) => ({
  type: types.ON_CAN_PLAY,
  payload
})
export const onPlay = (payload: {
  playState: PlayState
  currentDetectionAPI: CurrentDetectionAPI
}) => ({
  type: types.ON_PLAY,
  payload
})
export const onPause = (payload: {
  playState: PlayState
  currentDetectionAPI: CurrentDetectionAPI
}) => ({
  type: types.ON_PAUSE,
  payload
})
