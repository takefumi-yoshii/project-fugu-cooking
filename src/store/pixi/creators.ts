import * as PIXI from 'pixi.js'
import types from './types'
// ______________________________________________________
//
export function pixiInit() {
  return { type: types.PIXI_INIT }
}
export function pixiUpdate(payload: {
  app: PIXI.Application
  sprite: PIXI.Sprite
}) {
  return { type: types.PIXI_UPDATE, payload }
}
