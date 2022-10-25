import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Heading } from '@sympaoy/sympatico-component-library'
import MicroFrontend from './components/microfrontend/MicroFrontend'
import './assets/styles.css'
import { listen, send, remove } from './api/lyrics'

const lyrics = {
  quote: 'Vaatii paljon munaa mennä täysin omaa reittii',
}

function action(e) {
  console.log(`Pink Floyd - Breathe: ${e.detail.quote}`)
  send('solonenKosolaLyrics', lyrics)
  e.stopPropagation()
}

// Get child application HTTP address.
const { REACT_APP_TEST27_HOST: test27Host } = process.env

const Container = styled.div`
  padding: 16px;
  border: 1px solid blue;
`

function App() {
  useEffect(() => {
    /**
     * Communication between parent and child app using so called synthetic event (as
     * opposed to the events fired by the browser itself).
     * https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
     */
    listen('pinkFloydLyrics', action)

    return () => {
      remove('pinkFloydLyrics', action)
    }
  })

  return (
    <Container>
      <Heading
        color="primary"
        content="Test 28"
        tag="h1"
        qaId="test-28-heading"
      />
      <div className="css-from-test28">Element with .css-from-test28 class</div>
      <div className="css-from-test27">Element with .css-from-test27 class</div>
      {/* Child will share history with parent instead of instantiating its own. Via URL
      we can pass informtation between applications, since route changes triggered in any
      of them will be reflected in all of them. */}
      {/* Match name with child application's render[name] and unmount[name] functions */}
      <BrowserRouter>
        <nav>
          <Link to="/test27">Test 27</Link>
        </nav>
        <Routes>
          <Route path="/" />
          <Route
            path="/test27"
            element={
              <MicroFrontend
                history={window.history}
                host={test27Host}
                name="test27"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
