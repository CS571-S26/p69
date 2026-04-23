import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { INITIAL_GAMES } from './data/mockGames.js'
import CreateGamePage from './pages/CreateGamePage.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function App() {
  const [games, setGames] = useState(INITIAL_GAMES)

  function addGame(payload) {
    setGames((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        joinedCount: 1,
        ...payload,
      },
    ])
  }

  return (
    <Routes>
      <Route path="/" element={<Layout games={games} addGame={addGame} />}>
        <Route index element={<HomePage />} />
        <Route path="post" element={<CreateGamePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}

export default App
