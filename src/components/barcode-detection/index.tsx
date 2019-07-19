import React from 'react'
import DetectionView from '../common/detectionView'
import Button from './button'
// ______________________________________________________
//
const View: React.FC = () => (
  <DetectionView
    title="Barcode Detection"
    titleIconSvgString={require('../assets/qr.svg')}
    currentDetectionAPI="BARCODE_DETECTION"
  >
    <Button />
  </DetectionView>
)
// ______________________________________________________
//
export default View
