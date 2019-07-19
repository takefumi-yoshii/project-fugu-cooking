import React from 'react'
import DetectionView from '../common/detectionView'
// ______________________________________________________
//
const View: React.FC = () => (
  <DetectionView
    title="Text Detection"
    titleIconSvgString={require('../assets/font.svg')}
    currentDetectionAPI="TEXT_DETECTION"
  />
)
// ______________________________________________________
//
export default View
