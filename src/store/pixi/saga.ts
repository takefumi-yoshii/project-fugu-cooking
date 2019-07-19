import { fork, take, put, select } from 'redux-saga/effects'
import * as PIXI from 'pixi.js'
import { PixelateFilter } from '@pixi/filter-pixelate'
import * as constants from '../../constants'
import { StoreState } from '../index'
import * as creators from './creators'
import * as VideoCreators from '../video/creators'
import VideoTypes from '../video/types'
// ______________________________________________________
//

function* updatePixiApp(): IterableIterator<any> {
  const {
    video: { element }
  }: StoreState = yield select()
  if (element !== null) {
    const { width } = element.parentElement!.getBoundingClientRect()
    let offset = width / constants.VIDEO_WIDTH
    offset = offset > 1 ? 1 : offset
    const app = new PIXI.Application({
      width: constants.VIDEO_WIDTH * offset,
      height: constants.VIDEO_HEIGHT * offset
    })
    const sprite = new PIXI.Sprite()
    try {
      const texture = PIXI.Texture.from(element)
      sprite.texture = texture
      sprite.filters = [new PixelateFilter((16 * offset) >> 0)]
      app.stage.addChild(sprite)
      app.stage.scale.x = offset
      app.stage.scale.y = offset
      yield put(creators.pixiUpdate({ app, sprite }))
      document.getElementById('filteredView')!.appendChild(app.view)
    } catch (err) {}
  }
}

function* watchOnPlayUserMedia(): IterableIterator<any> {
  while (true) {
    const {
      payload: { currentVideoExperimentalAPI }
    }: ReturnType<typeof VideoCreators['onPlay']> = yield take(
      VideoTypes.ON_PLAY
    )
    if (currentVideoExperimentalAPI === 'FACE_DETECTION') {
      yield fork(updatePixiApp)
    }
  }
}
// ______________________________________________________
//
export default function*() {
  yield fork(watchOnPlayUserMedia)
}
