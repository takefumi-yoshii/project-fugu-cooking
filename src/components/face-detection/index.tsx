import React from 'react'
import DetectionView from '../common/detectionView'
// ______________________________________________________
//
const View: React.FC = () => (
  <DetectionView
    title="Face Detection"
    titleIconSvgString={require('../assets/face.svg')}
    currentDetectionAPI="FACE_DETECTION"
  />
)
// ______________________________________________________
//
export default View
