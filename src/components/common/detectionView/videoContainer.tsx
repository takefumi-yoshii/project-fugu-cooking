import React from 'react'
import styled from 'styled-components'
import * as constants from '../../../constants'
import DetectedRect from './detectedRect'
import CircleMaskSvg from './circleMaskSvg'
// ______________________________________________________
//
type Props = {
  className?: string
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  videoScale: number
  detectedBoundingBox: DOMRect | null
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <video ref={props.videoRef} />
    <div
      id="filteredView"
      style={{
        visibility: props.detectedBoundingBox !== null ? 'visible' : 'hidden'
      }}
    />
    {props.detectedBoundingBox && (
      <>
        <DetectedRect
          boundingBox={props.detectedBoundingBox}
          videoScale={props.videoScale}
        />
        <CircleMaskSvg videoScale={props.videoScale} />
      </>
    )}
  </div>
)
// ______________________________________________________
//
const StyledView = styled(View)`
  position: relative;
  video {
    width: 100%;
    height: 100%;
    max-width: ${constants.VIDEO_WIDTH}px;
    max-height: ${constants.VIDEO_HEIGHT}px;
  }
  #filteredView {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-clip-path: url(#svgPath);
    clip-path: url(#svgPath);
  }
`
// ______________________________________________________
//
export default StyledView
