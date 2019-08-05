import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { format as timeAgo } from 'timeago.js';
import { isEmpty as _isEmpty, capitalize as _capitalize } from 'lodash-es'


export default function CharactersCard(props) {
  const classes = useStyles()

  const {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin, // { name, url }
    location, // { name, url }
    image,
    episodes,
    created, // '2017-11-04T18:48:46.250Z'
  } = props

  const info = Object.entries({
    status,
    species,
    type,
    gender,
    origin: origin.name,
    location: location.name,
  }).map(([label, value]) => (
    <CharactersInfo.Item
      key={`${label}-${value}`}
      label={_capitalize(label)}
      value={_isEmpty(value) ? '--' :_capitalize(value)}
    />))

  const episodesInfo = (episodes || [])
    .map((ep) => ep && (
      <CharactersInfo.Item
        key={`${ep.episode}-${ep.name}`}
        label={ep.id + ')  ' + _capitalize(ep.episode)}
        value={_capitalize(ep.name)}
      />))

  return (
    <Card
      className={classes.card}
    >
      <CardMedia
        title={name}
        image={image}
        className={classes.media}
      />
      <CardHeader
        title={name}
        subheader={`id: ${id} - created ${timeAgo(created)}`}
      />
      <CardContent>
        <CharactersInfo>
          {info}
        </CharactersInfo>
        <hr/>
        <CharactersInfo>
          {episodesInfo}
        </CharactersInfo>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    width: 300,
    textAlign: 'left',
    marginTop: 16,
  },
  media: {
    height: 300,
  },
}))

const CharactersInfo = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: "Roboto", sans-serif;
`

CharactersInfo.Item = styled((props) => (
  <li className={props.className}>
    <small>{`${props.label}: `}</small>
    <strong>{` ${props.value}`}</strong>
  </li>
))``
