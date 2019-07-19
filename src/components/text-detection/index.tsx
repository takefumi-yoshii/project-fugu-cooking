import React, { useRef, useCallback } from 'react'
import { RouteProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SVGInline from 'react-svg-inline'
import { DetectedText } from '../../types'
import { StoreState, Dispatcher } from '../../store'
import { toggleVisibleDetectedRect } from '../../store/ui/creators'
import { VideoFacade } from '../facade'
import { useVideo } from '../hooks/useVideo'
import MediaStateMessage from '../common/mediaStateMessage'
import DetectedRect from '../common/detectedRect'
import DetectedRectInfo from '../common/detectedRectInfo'
// ______________________________________________________
//
type Props = {
  className?: string
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  videoScale: number
  isEnabledDetection: boolean | null
  isDisabledUserMedia: boolean | null
  isConnectingUserMedia: boolean
  detectedText: DetectedText | null
  handleToggleVisibleDetectedRect: () => void
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <h2>
      <SVGInline svg={require('../assets/font.svg')} />
      Text Detection
    </h2>
    <MediaStateMessage
      isEnabledDetection={props.isEnabledDetection}
      isDisabledUserMedia={props.isDisabledUserMedia}
      isConnectingUserMedia={props.isConnectingUserMedia}
    />
    <div className="videoContainer">
      <video ref={props.videoRef} />
      {props.detectedText && (
        <DetectedRect
          boundingBox={props.detectedText.boundingBox}
          videoScale={props.videoScale}
        />
      )}
    </div>
    {props.detectedText && (
      <>
        <DetectedRectInfo boundingBox={props.detectedText.boundingBox} />
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
    state => state.textDetection.isEnabledDetection
  )
  const { isConnectingUserMedia, isDisabledUserMedia, videoScale } = useVideo(
    videoRef,
    'TEXT_DETECTION'
  )
  const detectedText = useSelector<StoreState, DetectedText | null>(
    state => state.textDetection.detectedText
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
      detectedText={detectedText}
      handleToggleVisibleDetectedRect={handleToggleVisibleDetectedRect}
    />
  )
}
// ______________________________________________________
//
export default Container
