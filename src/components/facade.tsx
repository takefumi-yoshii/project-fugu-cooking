import React from 'react'
import styled from 'styled-components'
import * as styles from './styles'
import * as constants from '../constants'

export function VideoFacade<T>(View: React.FC<T>) {
  return styled(View)`
    h2 {
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
    }
    .videoContainer {
      width: 100%;
      position: relative;
    }
    video {
      width: 100%;
      height: 100%;
      max-width: ${constants.VIDEO_WIDTH}px;
      max-height: ${constants.VIDEO_HEIGHT}px;
    }
    .button {
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
    #filteredView {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      -webkit-clip-path: url(#svgPath);
      clip-path: url(#svgPath);
    }
  `
}
