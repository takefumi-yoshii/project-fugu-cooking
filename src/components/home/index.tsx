import React from 'react'
import styled from 'styled-components'
// ______________________________________________________
//
type Props = {
  className?: string
}
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <h1>Project Fugu Cooking</h1>
    <section>
      <h3>Unlocking new capabilities for the web</h3>
      <p>
        <a
          href="https://developers.google.com/web/updates/capabilities"
          target="_blank"
          rel="noreferrer"
        >
          https://developers.google.com/web/updates/capabilities
        </a>
      </p>
    </section>
    <section>
      <h3>Chromium Blog</h3>
      <p>Our commitment to a more capable web</p>
      <p>
        <a
          href="https://blog.chromium.org/2018/11/our-commitment-to-more-capable-web.html"
          target="_blank"
          rel="noreferrer"
        >
          https://blog.chromium.org/2018/11/our-commitment-to-more-capable-web.html
        </a>
      </p>
    </section>
    <img src={require('../../assets/fugu.png')} width="120" />
    <hr />
    <h2>Shape Detection</h2>
    <section>
      <h3>W3C Community Group</h3>
      <p>
        <a
          href="https://wicg.github.io/shape-detection-api/"
          target="_blank"
          rel="noreferrer"
        >
          https://wicg.github.io/shape-detection-api/
        </a>
      </p>
    </section>
  </div>
)
// ______________________________________________________
//
const StyledView = styled(View)`
  > h1 {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  > h2 {
    margin-bottom: 20px;
  }
  > section {
    margin-bottom: 20px;
  }
  > hr {
    margin-bottom: 20px;
  }
`
// ______________________________________________________
//
export default StyledView
