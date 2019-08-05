import { get as _get } from 'lodash-es'

import { createReducer } from '../store/utils'
import { charactersActionCreators } from './charactersActions'


const PAGE_SIZE = 20

const initialState = {
  characterList: [],
  error: null,
  page: null,
  count: null,
  isError: false,
  isLoading: false,
}


export default createReducer(initialState, {
  [charactersActionCreators.LIST_ALL.REQUEST]: (state, action) => ({
    ...state,
    page: _get(action, 'payload.page', 1),
    isLoading: true
  }),
  [charactersActionCreators.LIST_ALL.PASSED]: (state, action) => {
    const count = _get(action, 'payload.info.count', 1)

    return {
      ...state,
      count,
      isLoading: false,
      pagesCount: Math.ceil(count / PAGE_SIZE),
      characterList : _get(action, 'payload.results', []),
    }
  },
  [charactersActionCreators.LIST_ALL.FAILED]: (state, action) => ({
    ...state,
    isError: true,
    isLoading: false,
    error: action.payload,
  }),
})
