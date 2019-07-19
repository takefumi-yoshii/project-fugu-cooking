import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import * as styles from '../../styles'
import * as constants from '../../../constants'
import { Dispatcher } from '../../../store'
import { toggleVisibleDetectedRect } from '../../../store/ui/creators'
// ______________________________________________________
//
type ContainerProps = {
  className?: string
  boundingBox: DOMRect | null
}
type Props = {
  boundingBox: DOMRect
  handleToggleVisibleDetectedRect: () => void
} & ContainerProps
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <table>
      <tbody>
        <tr>
          <td>x : {props.boundingBox.x}</td>
          <td>y : {props.boundingBox.y}</td>
        </tr>
        <tr>
          <td>width : {props.boundingBox.width}</td>
          <td>height : {props.boundingBox.height}</td>
        </tr>
        <tr>
          <td>left : {props.boundingBox.left}</td>
          <td>right : {props.boundingBox.right}</td>
        </tr>
        <tr>
          <td>top : {props.boundingBox.top}</td>
          <td>bottom : {props.boundingBox.bottom}</td>
        </tr>
      </tbody>
    </table>
    <a onClick={props.handleToggleVisibleDetectedRect}>
      toggle visible detected rect
    </a>
  </div>
)
// ______________________________________________________
//
const StyledView = styled(View)`
  table {
    box-sizing: border-box;
    width: 100%;
    max-width: ${constants.VIDEO_WIDTH}px;
    font-size: 10px;
    background: ${styles.lightGray};
    border-collapse: collapse;
  }
  td {
    width: 25%;
    padding: 0.5em 1em;
    border: 1px solid #fff;
  }
`
// ______________________________________________________
//
const Container: React.FC<ContainerProps> = props => {
  const { boundingBox } = props
  if (!boundingBox) return <></>
  const dispatch = useDispatch<Dispatcher>()
  const handleToggleVisibleDetectedRect = useCallback(() => {
    dispatch(toggleVisibleDetectedRect())
  }, [])
  return (
    <StyledView
      handleToggleVisibleDetectedRect={handleToggleVisibleDetectedRect}
      boundingBox={boundingBox}
    />
  )
}
// ______________________________________________________
//
export default Container
