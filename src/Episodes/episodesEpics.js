import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import { delay, map, switchMap, takeUntil, catchError } from 'rxjs/operators'
import { get as _get } from 'lodash-es'

import { episodesActionCreators } from './episodesActions'


export function getManyEpisodeEpics(action$) {
  return action$
    .pipe(
      ofType(episodesActionCreators.GET_MANY_EPISODE.REQUEST),
      switchMap((action) => {
        const episodes = Array.from(_get(action, 'payload.results', [])
          .reduce((accum, { episode }, ndx) => {
            episode.forEach((epId) => accum.add(epId))
            return accum
          }, new Set()))


        return ajax.getJSON(`https://rickandmortyapi.com/api/episode/${episodes.join(',')}`)
          .pipe(
            delay(1),
            map((response) => {
              const episodes = _get(response, 'results', [])
                .reduce((accum, data) => {
                  accum[data.id] = data
                  return accum
                })

              return episodesActionCreators.GET_MANY_EPISODE.PASSED({ episodes })
            }),
            catchError((error) => of(episodesActionCreators.GET_MANY_EPISODE.FAILED(error.xhr.response))),
            takeUntil(action$.pipe(ofType(episodesActionCreators.GET_MANY_EPISODE.CANCEL))),
          )
      }),
      catchError((error) => of(episodesActionCreators.GET_MANY_EPISODE.FAILED(error))),
    )
}
