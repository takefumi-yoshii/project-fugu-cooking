import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../../../store'
import { CurrentDetectionAPI } from '../../../store/video/reducer'
import { useVideo } from './useVideo'
import Title from './title'
import VideoContainer from './videoContainer'
import DetectedRectInfo from './detectedRectInfo'
import MediaStateMessage from './mediaStateMessage'
// ______________________________________________________
//
type ContainerProps = {
  title: string
  titleIconSvgString: string
  currentDetectionAPI: CurrentDetectionAPI
}
type Props = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  videoScale: number
  detectedBoundingBox: DOMRect | null
  isEnabledDetection: boolean | null
  isDisabledUserMedia: boolean | null
  isConnectingUserMedia: boolean
} & ContainerProps
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <>
    <Title title={props.title} titleIconSvgString={props.titleIconSvgString} />
    <VideoContainer
      videoRef={props.videoRef}
      videoScale={props.videoScale}
      detectedBoundingBox={props.detectedBoundingBox}
    />
    <DetectedRectInfo boundingBox={props.detectedBoundingBox} />
    {props.children}
    <MediaStateMessage
      isEnabledDetection={props.isEnabledDetection}
      isDisabledUserMedia={props.isDisabledUserMedia}
      isConnectingUserMedia={props.isConnectingUserMedia}
    />
  </>
)
// ______________________________________________________
//
const Container: React.FC<ContainerProps> = props => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isEnabledDetection = useSelector<StoreState, boolean | null>(
    state => state.faceDetection.isEnabledDetection
  )
  const { isConnectingUserMedia, isDisabledUserMedia, videoScale } = useVideo(
    videoRef,
    props.currentDetectionAPI
  )
  const detectedBoundingBox = useSelector<StoreState, DOMRect | null>(
    state => state.ui.detectedBoundingBox
  )
  return (
    <View
      {...props}
      videoRef={videoRef}
      videoScale={videoScale}
      detectedBoundingBox={detectedBoundingBox}
      isEnabledDetection={isEnabledDetection}
      isConnectingUserMedia={isConnectingUserMedia}
      isDisabledUserMedia={isDisabledUserMedia}
    />
  )
}
// ______________________________________________________
//
export default Container
