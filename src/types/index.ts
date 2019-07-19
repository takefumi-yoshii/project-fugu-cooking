declare global {
  interface Window {
    BarcodeDetector: any
    FaceDetector: any
    TextDetector: any
  }
}

export type BarcodeFormat =
  | 'aztec'
  | 'code_128'
  | 'code_39'
  | 'code_93'
  | 'codabar'
  | 'data_matrix'
  | 'ean_13'
  | 'ean_8'
  | 'itf'
  | 'pdf417'
  | 'qr_code'
  | 'unknown'
  | 'upc_a'
  | 'upc_e'
export type CornerPoint = { x: number; y: number }
export type CornerPoints = CornerPoint[]
export type DetectedBarcode = {
  boundingBox: DOMRect
  format: BarcodeFormat
  cornerPoints: CornerPoints
  rawValue: string
}
export type Location = { x: number; y: number }
export type Landmark = {
  locastion: Location[]
  type: 'eye' | 'mouth' | 'nose'
}
export type DetectedFace = {
  boundingBox: DOMRect
  landmarks: Landmark[]
}
export type DetectedText = any
