import React from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../../store'
// ______________________________________________________
//
type Props = {
  boundingBox: DOMRect
  videoScale: number
}
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
  const detectedBoundingBox = useSelector<StoreState, boolean>(
    state => state.ui.visibleDetectedRect
  )
  if (!detectedBoundingBox) return <></>
  return <View {...props} />
}
// ______________________________________________________
//
export default Container
