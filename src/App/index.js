import React from "react"
import Container from '@material-ui/core/Container'

import CharactersList from '../Characters/CharactersList'


export default function App() {
  return (
    <Container maxWidth="lg">
      <Container maxWidth="sm">
        <img alt="Rick_and_Morty_logo" src="https://upload.wikimedia.org/wikipedia/en/c/c8/Rick_and_Morty_logo.png" />
      </Container>
        <CharactersList />
    </Container>
  );
}
