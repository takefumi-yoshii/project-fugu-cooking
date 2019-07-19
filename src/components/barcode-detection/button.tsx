import React from 'react'
import styled from 'styled-components'
import { DetectedBarcode } from '../../types'
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
    <a
      href={props.detectedBarcode.rawValue}
      target="_blank"
      rel="noreferrer"
      className="button"
    >
      {props.detectedBarcode.rawValue}
    </a>
  </div>
)
// ______________________________________________________
//
const StyledView = styled(View)`
  padding: 1em 0;
  text-align: center;
`
// ______________________________________________________
//
export default StyledView
