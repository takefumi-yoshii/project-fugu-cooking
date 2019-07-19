import types from './types'
// ______________________________________________________
//
export function toggleMenu() {
  return { type: types.TOGGLE_MENU }
}
export function closeMenu() {
  return { type: types.CLOSE_MENU }
}
export function toggleVisibleDetectedRect() {
  return { type: types.TOGGLE_VISIBLE_DETECTED_RECT }
}
