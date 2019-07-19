import React from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../../../store'
// ______________________________________________________
//
type Props = {
  boundingBox: DOMRect
  videoScale: number
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div
    style={{
      top: props.boundingBox.y * props.videoScale,
      left: props.boundingBox.x * props.videoScale,
      width: props.boundingBox.width * props.videoScale,
      height: props.boundingBox.height * props.videoScale,
      position: 'absolute',
      border: `2px solid #f00`
    }}
  />
)
// ______________________________________________________
//
const Container: React.FC<Props> = props => {
  const detectedBoundingBox = useSelector<StoreState, DOMRect | null>(
    state => state.ui.detectedBoundingBox
  )
  if (!detectedBoundingBox) return <></>
  return <View videoScale={props.videoScale} boundingBox={detectedBoundingBox} />
}
// ______________________________________________________
//
export default Container
