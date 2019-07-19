import React from 'react'
import styled from 'styled-components'
import * as styles from '../../styles'
// ______________________________________________________
//
type Props = {
  className?: string
  isEnabledDetection: boolean | null
  isDisabledUserMedia: boolean | null
  isConnectingUserMedia: boolean
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    {(() => {
      if (props.isEnabledDetection === false) {
        return <p className="message red">Experimental API is not available.</p>
      } else if (props.isDisabledUserMedia === true) {
        return <p className="message red">Require webcam!</p>
      } else if (props.isConnectingUserMedia === true) {
        return <p className="message gray">Connecting webcam...</p>
      } else {
        return <p className="message green">Experimental API is available.</p>
      }
    })()}
  </div>
)
// ______________________________________________________
//
export default styled(View)`
  position: fixed;
  bottom: 0;
  right: 0;
  > .message {
    padding: 0.4em 1em;
    font-size: 11px;
    color: #fff;
  }
  > .gray {
    background: ${styles.gray};
  }
  > .red {
    background: ${styles.red};
  }
  > .green {
    background: ${styles.green};
  }
`
