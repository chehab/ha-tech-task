// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './rootReducer'
import rootEpic from './rootEpic'


const epicMiddleware = createEpicMiddleware()


export default function configureStore(preloadedState) {
  const middlewares = [epicMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
    // module.hot.accept('./rootEpic', () => epicMiddleware.replaceEpic(require('./rootEpic').default))
  }

  epicMiddleware.run(rootEpic)

  return store
}
