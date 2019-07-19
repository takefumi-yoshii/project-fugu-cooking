import React from 'react'
import styled from 'styled-components'
import * as styles from '../styles'
import * as constants from '../../constants'
// ______________________________________________________
//
type Props = {
  className?: string
  boundingBox: DOMRect
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <table className={props.className}>
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
)
// ______________________________________________________
//
const StyledView = styled(View)`
  box-sizing: border-box;
  width: 100%;
  max-width: ${constants.VIDEO_WIDTH}px;
  font-size: 10px;
  background: ${styles.lightGray};
  border-collapse: collapse;
  td {
    width: 25%;
    padding: 0.5em 1em;
    border: 1px solid #fff;
  }
`
// ______________________________________________________
//
export default StyledView
