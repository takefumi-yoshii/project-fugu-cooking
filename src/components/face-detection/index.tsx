import React, { useRef, useCallback } from 'react'
import { RouteProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SVGInline from 'react-svg-inline'
import { DetectedFace } from '../../types'
import { StoreState, Dispatcher } from '../../store'
import { toggleVisibleDetectedRect } from '../../store/ui/creators'
import { VideoFacade } from '../facade'
import { useVideo } from '../hooks/useVideo'
import MediaStateMessage from '../common/mediaStateMessage'
import DetectedRect from '../common/detectedRect'
import DetectedRectInfo from '../common/detectedRectInfo'
import CircleMaskSvg from '../common/circleMaskSvg'
// ______________________________________________________
//
type Props = {
  className?: string
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  videoScale: number
  isEnabledDetection: boolean | null
  isDisabledUserMedia: boolean | null
  isConnectingUserMedia: boolean
  detectedFace: DetectedFace | null
  handleToggleVisibleDetectedRect: () => void
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <h2>
      <SVGInline svg={require('../assets/face.svg')} />
      Face Detection
    </h2>
    <MediaStateMessage
      isEnabledDetection={props.isEnabledDetection}
      isDisabledUserMedia={props.isDisabledUserMedia}
      isConnectingUserMedia={props.isConnectingUserMedia}
    />
    <div className="videoContainer">
      <video ref={props.videoRef} />
      <div
        id="filteredView"
        style={{
          visibility: props.detectedFace !== null ? 'visible' : 'hidden'
        }}
      />
      {props.detectedFace && (
        <>
          <DetectedRect
            boundingBox={props.detectedFace.boundingBox}
            videoScale={props.videoScale}
          />
          <CircleMaskSvg videoScale={props.videoScale} />
        </>
      )}
    </div>
    {props.detectedFace && (
      <>
        <DetectedRectInfo boundingBox={props.detectedFace.boundingBox} />
        <a onClick={props.handleToggleVisibleDetectedRect}>
          toggle visible detected rect
        </a>
      </>
    )}
  </div>
)
// ______________________________________________________
//
const StyledView = VideoFacade<Props>(View)
// ______________________________________________________
//
const Container: React.FC<RouteProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isEnabledDetection = useSelector<StoreState, boolean | null>(
    state => state.faceDetection.isEnabledDetection
  )
  const { isConnectingUserMedia, isDisabledUserMedia, videoScale } = useVideo(
    videoRef,
    'FACE_DETECTION'
  )
  const detectedFace = useSelector<StoreState, DetectedFace | null>(
    state => state.faceDetection.detectedFace
  )
  const dispatch = useDispatch<Dispatcher>()
  const handleToggleVisibleDetectedRect = useCallback(() => {
    dispatch(toggleVisibleDetectedRect())
  }, [])
  return (
    <StyledView
      videoRef={videoRef}
      videoScale={videoScale}
      isEnabledDetection={isEnabledDetection}
      isConnectingUserMedia={isConnectingUserMedia}
      isDisabledUserMedia={isDisabledUserMedia}
      detectedFace={detectedFace}
      handleToggleVisibleDetectedRect={handleToggleVisibleDetectedRect}
    />
  )
}
// ______________________________________________________
//
export default Container
