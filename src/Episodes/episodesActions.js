import { createAction } from 'redux-actions';


export const episodesActionCreators = {
  GET_MANY_EPISODE: {
    REQUEST: createAction('Episode/GET_MANY 💬', (episodesIds) => ({ episodesIds })),
    PASSED: createAction('Episode/GET_MANY ✅'),
    FAILED: createAction('Episode/GET_MANY ❌'),
    CANCEL: createAction('Episode/GET_MANY 🆑'),
  }
}
