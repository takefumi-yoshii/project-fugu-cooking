import { useMemo, useEffect, MutableRefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as constants from '../../constants'
import { StoreState, Dispatcher } from '../../store'
import { setVideoElement, requireUserMedia } from '../../store/video/creators'
import { CurrentVideoExperimentalAPI } from '../../store/video/reducer'
// ______________________________________________________
//
const defaultConstraints: MediaStreamConstraints = {
  video: {
    width: constants.VIDEO_WIDTH,
    height: constants.VIDEO_HEIGHT
  },
  audio: false
}
export function useVideo(
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  currentVideoExperimentalAPI: CurrentVideoExperimentalAPI
) {
  const dispatch = useDispatch<Dispatcher>()
  const playState = useSelector((store: StoreState) => store.video.playState)
  const isDisabledUserMedia = useSelector(
    (store: StoreState) => store.video.isDisabledUserMedia
  )
  const isConnectingUserMedia = useMemo(
    () => playState !== 'play' && !isDisabledUserMedia === null,
    [playState, isDisabledUserMedia]
  )
  const videoScale = useMemo(() => {
    if (!videoRef.current) return 0
    return (
      videoRef.current.getBoundingClientRect().width / constants.VIDEO_WIDTH
    )
  }, [videoRef.current, window.innerWidth])
  useEffect(() => {
    if (videoRef.current !== null) {
      dispatch(setVideoElement(videoRef.current))
      dispatch(
        requireUserMedia({
          constraints: defaultConstraints,
          currentVideoExperimentalAPI
        })
      )
    }
  }, [videoRef])
  return { isConnectingUserMedia, isDisabledUserMedia, videoScale }
}
