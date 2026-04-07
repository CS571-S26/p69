import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import CreateGamePage from './pages/CreateGamePage.jsx'
import HomePage from './pages/HomePage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="post" element={<CreateGamePage />} />
      </Route>
    </Routes>
  )
}

export default App
