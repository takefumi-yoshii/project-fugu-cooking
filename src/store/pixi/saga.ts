import { fork, take, put, select } from 'redux-saga/effects'
import * as PIXI from 'pixi.js'
import { PixelateFilter } from '@pixi/filter-pixelate'
import * as constants from '../../constants'
import { StoreState } from '../index'
import * as VideoCreators from '../video/creators'
import VideoTypes from '../video/types'
import UITypes from '../ui/types'
// ______________________________________________________
//
function* updatePixiApp(): IterableIterator<any> {
  while (true) {
    const {
      pixi: { app, sprite },
      video: { element, currentDetectionAPI }
    }: StoreState = yield select()
    if (element !== null) {
      const { width } = element.parentElement!.getBoundingClientRect()
      let offset = width / constants.VIDEO_WIDTH
      offset = offset > 1 ? 1 : offset
      const texture = PIXI.Texture.from(element)
      sprite.texture = texture
      sprite.filters = [new PixelateFilter((16 * offset) >> 0)]
      app.stage.addChild(sprite)
      app.stage.scale.x = offset
      app.stage.scale.y = offset
      document.getElementById('filteredView')!.appendChild(app.view)
    }
    if (currentDetectionAPI !== 'FACE_DETECTION') break
    yield take(UITypes.ON_RESIZE_WINDOW)
  }
}
function* watchOnPlayUserMedia(): IterableIterator<any> {
  while (true) {
    const {
      payload: { currentDetectionAPI }
    }: ReturnType<typeof VideoCreators['onPlay']> = yield take(
      VideoTypes.ON_PLAY
    )
    if (currentDetectionAPI === 'FACE_DETECTION') {
      yield fork(updatePixiApp)
    }
  }
}
// ______________________________________________________
//
export default function*() {
  yield fork(watchOnPlayUserMedia)
}
