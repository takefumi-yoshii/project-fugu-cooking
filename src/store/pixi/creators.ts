import * as PIXI from 'pixi.js'
import types from './types'
// ______________________________________________________
//
export const pixiInit = () => ({ type: types.PIXI_INIT })
export const pixiUpdate = (payload: {
  app: PIXI.Application
  sprite: PIXI.Sprite
}) => ({ type: types.PIXI_UPDATE, payload })
