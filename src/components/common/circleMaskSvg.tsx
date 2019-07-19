import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../../store'
// ______________________________________________________
//
type Props = {
  cx: number
  cy: number
  r: number
}
type ContainerProps = {
  videoScale: number
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <svg
    viewBox={`0 0 100% 100%`}
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute'
    }}
  >
    <clipPath id="svgPath">
      <circle cx={props.cx} cy={props.cy} r={props.r} />
    </clipPath>
  </svg>
)
// ______________________________________________________
//
const Container: React.FC<ContainerProps> = props => {
  const detectedBoundingBox = useSelector<StoreState, DOMRect | null>(
    state => state.ui.detectedBoundingBox
  )
  const cx = useMemo(() => {
    if (!detectedBoundingBox) return 0
    const { left, width } = detectedBoundingBox
    return (left + width * 0.5) * props.videoScale
  }, [detectedBoundingBox, props.videoScale])
  const cy = useMemo(() => {
    if (!detectedBoundingBox) return 0
    const { top, width } = detectedBoundingBox
    return (top + width * 0.5) * props.videoScale
  }, [detectedBoundingBox, props.videoScale])
  const r = useMemo(() => {
    if (!detectedBoundingBox) return 0
    const { width } = detectedBoundingBox
    return width * 0.5 * props.videoScale
  }, [detectedBoundingBox, props.videoScale])
  return <View cx={cx} cy={cy} r={r} />
}
// ______________________________________________________
//
export default Container
