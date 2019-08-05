import queryString from 'query-string'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import { delay, map, switchMap, takeUntil, catchError } from 'rxjs/operators'
import {
  get as _get,
  set as _set,
  isEmpty as _isEmpty,
} from 'lodash-es'

import { episodesActionCreators } from '../Episodes/episodesActions'
import { charactersActionCreators } from './charactersActions'


export function listCharactersEpics(action$) {
  return action$
    .pipe(
      ofType(charactersActionCreators.LIST_ALL.REQUEST),
      switchMap((action) => {
        const query = queryString.stringify({ page: _get(action, 'payload.page', 1)})

        const reqQuery = _isEmpty(query)
          ? ''
          : `?${query}`

        return ajax.getJSON(`https://rickandmortyapi.com/api/character/${reqQuery}`)
          .pipe(
            delay(1),
            map((response) => {
              _get(response, 'results', [])
                .forEach((i, ndx) => {
                  const episodesIds = _get(response, `results.${ndx}.episode`)
                    .map((epUrl) => {
                      const [, epId] = epUrl.match(/episode\/(\d+)$/) || [null, null]

                      return epId
                    })

                  _set(response, `results.${ndx}.episodesIds`, episodesIds)
                })

              return charactersActionCreators.LIST_ALL.PASSED(response)
            }),
            catchError((error) => of(charactersActionCreators.LIST_ALL.FAILED(error.xhr.response))),
            takeUntil(action$.pipe(ofType(charactersActionCreators.LIST_ALL.CANCEL))),
          )
      }),
      catchError((error) => of(charactersActionCreators.LIST_ALL.FAILED(error))),
    )
}


export function getCharactersEpisodeEpics(action$) {
  return action$
    .pipe(
      ofType(charactersActionCreators.LIST_ALL.PASSED),
      switchMap((action) => {
        const episodes = Array.from(_get(action, 'payload.results', [])
          .reduce((accum, { episode }, ndx) => {
            episode.forEach((epId) => accum.add(epId))
            return accum
          }, new Set()))

        return of(episodesActionCreators.GET_MANY_EPISODE.REQUEST(episodes))
      }),
    )
}
