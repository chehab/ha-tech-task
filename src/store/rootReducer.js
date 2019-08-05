import { combineReducers } from 'redux'

import characterReducer from '../Characters/characterReducer'
import episodeReducer from '../Episodes/episodeReducer'

export default combineReducers({
  Characters: characterReducer,
  Episodes: episodeReducer,
})
