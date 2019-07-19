import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { storeFactory, history } from '../store'
import reducersMapObject from '../store/reducer'
import * as styles from './styles'
import Layout from './layout'
import ShapeDetection from './home'
import BarcodeDetection from './barcode-detection'
import TextDetection from './text-detection'
import FaceDetection from './face-detection'
// ______________________________________________________
//
const App = () => (
  <Provider store={storeFactory(reducersMapObject)}>
    <ConnectedRouter history={history}>
      <GlobalStyle />
      <Layout>
        <Switch>
          <Route exact path="/" component={ShapeDetection} />
          <Route path="/barcode-detection" component={BarcodeDetection} />
          <Route path="/text-detection" component={TextDetection} />
          <Route path="/face-detection" component={FaceDetection} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>
)
// ______________________________________________________
//
export const GlobalStyle = createGlobalStyle`
  a {
    color: ${styles.blue};
  }
  h1, h2, h3 {
    color: ${styles.darkBlueGray};
  }
  h1 {
    margin-bottom: 40px;
  }
  h2 {
    margin-bottom: 30px;
  }
  h3 {
    margin-bottom: 20px;
  }
`
// ______________________________________________________
//
export default App
