import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SVGInline from 'react-svg-inline'
import styled from 'styled-components'
import media from 'styled-media-query'
import { StoreState, Dispatcher } from '../store'
import { toggleMenu } from '../store/ui/creators'
import * as styles from './styles'
import Nav from './nav'
// ______________________________________________________
//
type ContainerProps = {
  className?: string
}
type Props = {
  onClickMenu: () => void
  isOpenMenu: boolean
} & ContainerProps
// ______________________________________________________
//
const View: React.FC<Props> = props => (
  <div className={props.className}>
    <main className="body">
      <div className="content">{props.children}</div>
    </main>
    <aside className="aside">
      <Nav />
    </aside>
    <div className="menu" onClick={props.onClickMenu}>
      {!props.isOpenMenu && <SVGInline svg={require('./assets/menu.svg')} />}
      {props.isOpenMenu && <SVGInline svg={require('./assets/close.svg')} />}
    </div>
  </div>
)
// ______________________________________________________
//
const headerHeight = 48
const StyledView = styled(View)`
  ${media.greaterThan<Props>('medium')`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    min-height: 100vh;
    > .body {
      display: flex;
      width: 100%;
      > .content {
        box-sizing: border-box;
        width: 100%;
        padding: 40px;
      }
    }
    > .aside {
      display: flex;
      min-width: 240px;
    }
    > .menu {
      display: none;
    }
  `}
  ${media.lessThan<Props>('medium')`
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    > .body {
      padding: ${headerHeight + 20}px 20px 20px 20px;
    }
    > .aside {
      box-sizing: border-box;
      display: flex;
      width: 80%;
      height: 100%;
      padding-top: ${headerHeight}px;
      position: absolute;
      top: 0;
      left: 0;
      transform: ${props =>
        props.isOpenMenu ? `translateX(0%)` : `translateX(-100%)`};
      transition-duration: 0.2s;
    }
    > .menu {
      display: flex;
      align-items: center;
      width: 100%;
      height: ${headerHeight}px;
      position: fixed;
      top: 0;
      left: 0;
      line-height: 0;
      background: ${styles.darkBlueGray};
      box-shadow: 0px 0px 10px rgba(0, 0, 0, .6);
      svg {
        margin-left: 14px;
      }
    }
  `}
`
// ______________________________________________________
//
const Container: React.FC = props => {
  const isOpenMenu = useSelector((store: StoreState) => store.ui.isOpenMenu)
  const dispatch = useDispatch<Dispatcher>()
  return (
    <StyledView
      isOpenMenu={isOpenMenu}
      onClickMenu={() => dispatch(toggleMenu())}
      {...props}
    />
  )
}
// ______________________________________________________
//
export default Container
