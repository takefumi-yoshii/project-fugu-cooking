import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as styles from './styles'
// ______________________________________________________
//
type Props = {
  className?: string
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <nav className={props.className}>
    <ul>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/barcode-detection'}>Barcode Detection API</Link>
      </li>
      <li>
        <Link to={'/text-detection'}>Text Detection API</Link>
      </li>
      <li>
        <Link to={'/face-detection'}>Face Detection API</Link>
      </li>
    </ul>
  </nav>
)
// ______________________________________________________
//
const StyledView = styled(View)`
  flex: 1 0 0;
  background: ${styles.darkBlueGray};
  li {
    list-style: none;
    border-bottom: 1px solid ${styles.darkBlue};
  }
  a {
    padding: 1em;
    display: block;
    color: #fff;
    text-decoration: none;
  }
`
// ______________________________________________________
//
export default StyledView
