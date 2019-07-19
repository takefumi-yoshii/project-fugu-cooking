import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import * as styles from '../styles'
import * as constants from '../../constants'
import { DetectedBarcode } from '../../types'
import { StoreState } from '../../store'
// ______________________________________________________
//
type Props = {
  className?: string
  detectedBarcode: DetectedBarcode
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <a href={props.detectedBarcode.rawValue} target="_blank" rel="noreferrer">
      {props.detectedBarcode.rawValue}
    </a>
  </div>
)
// ______________________________________________________
//
const StyledView = styled(View)`
  padding: 1em 0;
  text-align: center;
  a {
    box-sizing: border-box;
    display: block;
    width: 100%;
    max-width: ${constants.VIDEO_WIDTH}px;
    padding: 0.5em 1em;
    border-radius: 3px;
    color: #fff;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: ${styles.blue};
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.2);
  }
`
// ______________________________________________________
//
const Container: React.FC = () => {
  const detectedBarcode = useSelector<StoreState, DetectedBarcode | null>(
    state => state.barcodeDetection.detectedBarcode
  )
  if (!detectedBarcode) return <></>
  return <StyledView detectedBarcode={detectedBarcode} />
}
// ______________________________________________________
//
export default Container
