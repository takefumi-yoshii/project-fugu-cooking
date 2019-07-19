import React from 'react'
import DetectionView from '../common/detectionView'
import Additional from './additional'
// ______________________________________________________
//
const View: React.FC = () => (
  <DetectionView
    title="Barcode Detection"
    titleIconSvgString={require('../assets/qr.svg')}
    currentDetectionAPI="BARCODE_DETECTION"
  >
    <Additional />
  </DetectionView>
)
// ______________________________________________________
//
export default View
