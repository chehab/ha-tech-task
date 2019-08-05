import { createAction } from 'redux-actions';


export const charactersActionCreators = {
  LIST_ALL: {
    REQUEST: createAction('Characters/ListAll 💬', (page) => ({ page })),
    PASSED: createAction('Characters/ListAll ✅'),
    FAILED: createAction('Characters/ListAll ❌'),
    CANCEL: createAction('Characters/ListAll 🆑'),
  },
  GET_MANY_EPISODE: {
    REQUEST: createAction('Episode/GET_MANY 💬', (episodes) => ({ episodes })),
    PASSED: createAction('Episode/GET_MANY ✅'),
    FAILED: createAction('Episode/GET_MANY ❌'),
    CANCEL: createAction('Episode/GET_MANY 🆑'),
  }
}
