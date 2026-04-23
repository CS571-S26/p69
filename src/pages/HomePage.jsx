import { Alert, Col, Container, Row } from 'react-bootstrap'
import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import FilterBar from '../components/FilterBar.jsx'
import GameCard from '../components/GameCard.jsx'
import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'

function filterGames(games, query, skillFilter, openOnly) {
  const q = query.trim().toLowerCase()
  return games.filter((g) => {
    if (q) {
      const hit =
        g.sport.toLowerCase().includes(q) || g.location.toLowerCase().includes(q)
      if (!hit) return false
    }
    if (skillFilter !== 'all' && g.skillLevel !== skillFilter) return false
    if (openOnly && g.joinedCount >= g.maxPlayers) return false
    return true
  })
}

function HomePage() {
  const { games } = useOutletContext()
  const [query, setQuery] = useState('')
  const [skillFilter, setSkillFilter] = useState('all')
  const [openOnly, setOpenOnly] = useState(false)

  const filtered = useMemo(
    () => filterGames(games, query, skillFilter, openOnly),
    [games, query, skillFilter, openOnly],
  )

  const hasFilters = query.trim() !== '' || skillFilter !== 'all' || openOnly
  const resultLabel = (() => {
    if (games.length === 0) return null
    if (hasFilters) {
      return `Showing ${filtered.length} of ${games.length} game${games.length === 1 ? '' : 's'}`
    }
    return `${games.length} game${games.length === 1 ? '' : 's'}`
  })()

  return (
    <>
      <Hero />
      <Container className="py-2 pb-4">
        <h2 className="h3 mb-2">Upcoming games</h2>
        <p className="text-muted mb-3">Find and join pickup games on campus.</p>

        {games.length > 0 && (
          <div className="mb-4 p-3 rounded border bg-body-secondary bg-opacity-25">
            <Row className="g-3 align-items-end">
              <Col md>
                <SearchBar value={query} onChange={setQuery} />
              </Col>
              <Col xs={12}>
                <FilterBar
                  skillFilter={skillFilter}
                  onSkillFilterChange={setSkillFilter}
                  openOnly={openOnly}
                  onOpenOnlyChange={setOpenOnly}
                />
              </Col>
            </Row>
            {resultLabel && (
              <p className="text-muted small mb-0 mt-2" role="status">
                {resultLabel}
              </p>
            )}
          </div>
        )}

        {games.length === 0 ? (
          <Alert variant="info">No games posted yet. Be the first to post one!</Alert>
        ) : filtered.length === 0 ? (
          <Alert variant="warning">No games match your search or filters. Try adjusting them.</Alert>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-3">
            {filtered.map((game) => (
              <Col key={game.id}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default HomePage
