import { combineEpics } from 'redux-observable';

import { listCharactersEpics, getCharactersEpisodeEpics } from '../Characters/charactersEpics'
import { getManyEpisodeEpics } from '../Episodes/episodesEpics'


export default combineEpics(
  listCharactersEpics,
  getCharactersEpisodeEpics,
  getManyEpisodeEpics,
)
