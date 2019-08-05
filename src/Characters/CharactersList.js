import React, { useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import { connect, useDispatch } from 'react-redux'

import { get as _get } from 'lodash-es'

import CharactersCard from './CharacterCard'
import Paginate from './components/Paginate'
import { charactersActionCreators } from './charactersActions'


function CharactersList(props) {
  const {
    pagesCount,
    isLoading,
    currentPage,
    episodesList,
    charactersList,
  } = props

  const dispatch = useDispatch()

  const loadPage = useCallback(
    (pageNum) => {
      if (!isLoading && currentPage !== pageNum) {
        dispatch(charactersActionCreators.LIST_ALL.REQUEST(pageNum))
      }
    },
    [dispatch, isLoading, currentPage]
  )

  const nextPage = useCallback(
    () => loadPage(currentPage + 1),
    [loadPage, currentPage]
  )

  const prevPage = useCallback(
    () => loadPage(currentPage - 1),
    [loadPage, currentPage]
  )

  if (!charactersList.length) {
    loadPage(1)
  }

  const characters = charactersList
    .map((charactersInfo) => (
      <CharactersCard
        key={charactersInfo.id}
        {...charactersInfo}
        episodes={charactersInfo
          .episodesIds
          .map((epID) => _get(episodesList, epID))
        }
      />))

  return (
    <>
      <Grid
        container
        spacing={10}
        direction="row"
        alignItems="stretch"
        alignContent="stretch"
        justify="space-between"
      >
        {characters}
      </Grid>

      <Grid
        container
        justify="center"
      >
        <Paginate
          onNext={nextPage}
          onPrev={prevPage}
          onSelect={loadPage}
          pagesCount={pagesCount}
          currentPage={currentPage}
          hidden={!charactersList.length}
        />
      </Grid>
    </>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    episodesList: _get(state, 'Episodes.episodes', {}),
    charactersList: _get(state, 'Characters.characterList', []),
    currentPage: _get(state, 'Characters.page', 1),
    totalCount: _get(state, 'Characters.count', 1),
    pagesCount: _get(state, 'Characters.pagesCount', 1),
    isLoading: _get(state, 'Characters.isLoading', false),
  }
}

export default connect(mapStateToProps)(CharactersList)
