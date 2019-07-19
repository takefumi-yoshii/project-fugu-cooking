import React, { useRef, useCallback } from 'react'
import { RouteProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SVGInline from 'react-svg-inline'
import { DetectedBarcode } from '../../types'
import { StoreState, Dispatcher } from '../../store'
import { toggleVisibleDetectedRect } from '../../store/ui/creators'
import { VideoFacade } from '../facade'
import { useVideo } from '../hooks/useVideo'
import MediaStateMessage from '../common/mediaStateMessage'
import Button from './button'
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
  detectedBarcode: DetectedBarcode | null
  handleToggleVisibleDetectedRect: () => void
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <h2>
      <SVGInline svg={require('../assets/qr.svg')} />
      Barcode Detection
    </h2>
    <MediaStateMessage
      isEnabledDetection={props.isEnabledDetection}
      isDisabledUserMedia={props.isDisabledUserMedia}
      isConnectingUserMedia={props.isConnectingUserMedia}
    />
    <div className="videoContainer">
      <video ref={props.videoRef} />
      {props.detectedBarcode && (
        <DetectedRect
          boundingBox={props.detectedBarcode.boundingBox}
          videoScale={props.videoScale}
        />
      )}
    </div>
    {props.detectedBarcode && (
      <DetectedRectInfo boundingBox={props.detectedBarcode.boundingBox} />
    )}
    {props.detectedBarcode && (
      <>
        <Button detectedBarcode={props.detectedBarcode} />
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
    state => state.barcodeDetection.isEnabledDetection
  )
  const { isConnectingUserMedia, isDisabledUserMedia, videoScale } = useVideo(
    videoRef,
    'BARCODE_DETECTION'
  )
  const detectedBarcode = useSelector<StoreState, DetectedBarcode | null>(
    state => state.barcodeDetection.detectedBarcode
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
      detectedBarcode={detectedBarcode}
      handleToggleVisibleDetectedRect={handleToggleVisibleDetectedRect}
    />
  )
}
// ______________________________________________________
//
export default Container
