import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'

import "./styles.css"
import configStore from './store/configStore'
import App from './App'


const store = configStore()


const appRoot = (
  <Provider store={store}>
    <App/>
  </Provider>
)


const rootElm = document
  .getElementById("root")


ReactDOM.render(appRoot, rootElm)
