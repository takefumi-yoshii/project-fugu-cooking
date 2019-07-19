import { useState, useMemo, useEffect, MutableRefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as constants from '../../../constants'
import { StoreState, Dispatcher } from '../../../store'
import {
  setVideoElement,
  requireUserMedia
} from '../../../store/video/creators'
import { CurrentDetectionAPI } from '../../../store/video/reducer'
// ______________________________________________________
//
const defaultConstraints: MediaStreamConstraints = {
  video: {
    width: constants.VIDEO_WIDTH,
    height: constants.VIDEO_HEIGHT
  },
  audio: false
}
// ______________________________________________________
//
export function useVideo(
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  currentDetectionAPI: CurrentDetectionAPI
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
  const [videoScale, updateVideoScale] = useState(0)
  useEffect(() => {
    const onResize = () => {
      if (!videoRef.current) return updateVideoScale(0)
      const scale =
        videoRef.current.getBoundingClientRect().width / constants.VIDEO_WIDTH
      updateVideoScale(scale)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  useEffect(() => {
    if (videoRef.current !== null) {
      dispatch(setVideoElement(videoRef.current))
      dispatch(
        requireUserMedia({
          constraints: defaultConstraints,
          currentDetectionAPI
        })
      )
    }
  }, [videoRef])
  return { isConnectingUserMedia, isDisabledUserMedia, videoScale }
}
