import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { useGames } from './hooks/useGames.js'
import CreateGamePage from './pages/CreateGamePage.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import MyGamesPage from './pages/MyGamesPage.jsx'

function App() {
  const { games, addGame, joinedIds, toggleJoin } = useGames()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout games={games} addGame={addGame} joinedIds={joinedIds} toggleJoin={toggleJoin} />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="post" element={<CreateGamePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="mine" element={<MyGamesPage />} />
      </Route>
    </Routes>
  )
}

export default App
