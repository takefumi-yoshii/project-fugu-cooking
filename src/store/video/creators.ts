import types from './types'
import { PlayState, CurrentVideoExperimentalAPI } from './reducer'
// ______________________________________________________
//
export function requireUserMedia(payload: {
  constraints: MediaStreamConstraints
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
}) {
  return { type: types.REQUIRE_USER_MEDIA, payload }
}
export function setVideoElement(element: HTMLVideoElement | null) {
  return { type: types.SET_VIDEO_ELEMENT, payload: { element } }
}
export function setMediaStream(stream: MediaStream) {
  return { type: types.SET_MEDIA_STREAM, payload: { stream } }
}
export function setIsDisabledUserMedia(flag: boolean) {
  return { type: types.SET_IS_DISABLED_USER_MEDIA, payload: { flag } }
}
export function onCanPlay(payload: {
  playState: PlayState
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
}) {
  return { type: types.ON_CAN_PLAY, payload }
}
export function onPlay(payload: {
  playState: PlayState
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
}) {
  return { type: types.ON_PLAY, payload }
}
export function onPause(payload: {
  playState: PlayState
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
}) {
  return { type: types.ON_PAUSE, payload }
}
