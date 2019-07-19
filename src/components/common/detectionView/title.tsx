import React from 'react'
import SVGInline from 'react-svg-inline'
import styled from 'styled-components'
import * as styles from '../../styles'
// ______________________________________________________
//
type Props = {
  className?: string
  title: string
  titleIconSvgString: string
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <h2 className={props.className}>
    <SVGInline svg={props.titleIconSvgString} />
    {props.title}
  </h2>
)
// ______________________________________________________
//
const StyledView = styled(View)`
  display: flex;
  .SVGInline {
    line-height: 0;
  }
  svg {
    margin-right: 12px;
    path {
      fill: ${styles.blueGray};
    }
  }
`
// ______________________________________________________
//
export default StyledView
