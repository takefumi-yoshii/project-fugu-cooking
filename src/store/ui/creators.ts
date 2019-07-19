import types from './types'
// ______________________________________________________
//
export const toggleMenu = () => ({ type: types.TOGGLE_MENU })
export const closeMenu = () => ({ type: types.CLOSE_MENU })
export const toggleVisibleDetectedRect = () => ({
  type: types.TOGGLE_VISIBLE_DETECTED_RECT
})
export const onResizeWindow = (payload: {
  innerWidth: number
  innerHeight: number
}) => ({ type: types.ON_RESIZE_WINDOW, payload })
