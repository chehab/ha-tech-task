import { get as _get } from 'lodash-es'

import { createReducer } from '../store/utils'
import { episodesActionCreators } from '../Episodes/episodesActions'


const initialState = {
  episodes: {},
  episodesIds: [],
  error: null,
  isError: false,
  isLoading: false,
}


export default createReducer(initialState, {
  [episodesActionCreators.GET_MANY_EPISODE.REQUEST]: (state, action) => ({
    ...state,
    episodesIds: _get(action, 'payload.episodesIds', []),
    isLoading: true
  }),
  [episodesActionCreators.GET_MANY_EPISODE.PASSED]: (state, action) => {
    const episodes = _get(action, 'payload.episodes', {})

    return {
      ...state,
      isLoading: false,
      episodes: {
        ...(state.episodes || {}),
        ...episodes,
      },
    }
  },
  [episodesActionCreators.GET_MANY_EPISODE.FAILED]: (state, action) => ({
    ...state,
    isError: true,
    isLoading: false,
    error: action.payload,
  }),
})
