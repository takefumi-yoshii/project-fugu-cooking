import { Reducer } from 'redux'
import * as PIXI from 'pixi.js'
import * as constants from '../../constants'
import { Actions } from '../actions'
// ______________________________________________________
//
type State = {
  app: PIXI.Application
  sprite: PIXI.Sprite
}
// ______________________________________________________
//
export const initialStateFactory = (injects?: Partial<State>): State => ({
  app: new PIXI.Application({
    width: constants.VIDEO_WIDTH,
    height: constants.VIDEO_HEIGHT
  }),
  sprite: new PIXI.Sprite(),
  ...injects
})
// ______________________________________________________
//
export default (
  initialState = initialStateFactory()
): Reducer<State, Actions> => (state = initialState, action): State => {
  switch (action.type) {
    default:
      return state
  }
}
