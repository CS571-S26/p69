import { Alert, Col, Container, Row } from 'react-bootstrap'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import FilterBar from '../components/FilterBar.jsx'
import GameCard from '../components/GameCard.jsx'
import Hero from '../components/Hero.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import SearchBar from '../components/SearchBar.jsx'

function isUpcomingStart(iso) {
  return new Date(iso).getTime() > Date.now()
}

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
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [skillFilter, setSkillFilter] = useState('all')
  const [openOnly, setOpenOnly] = useState(false)
  const postedFromForm =
    location.state?.posted === true && typeof location.state?.sport === 'string'
      ? location.state.sport
      : null

  const upcomingGames = useMemo(
    () => games.filter((g) => isUpcomingStart(g.startsAt)),
    [games],
  )

  const { openCount, total } = useMemo(() => {
    const openC = upcomingGames.filter((g) => g.joinedCount < g.maxPlayers).length
    return { openCount: openC, total: upcomingGames.length }
  }, [upcomingGames])

  const filtered = useMemo(
    () => filterGames(upcomingGames, query, skillFilter, openOnly),
    [upcomingGames, query, skillFilter, openOnly],
  )

  const hasFilters = query.trim() !== '' || skillFilter !== 'all' || openOnly
  const resultLabel = (() => {
    if (upcomingGames.length === 0) return null
    if (hasFilters) {
      return `Showing ${filtered.length} of ${upcomingGames.length} game${
        upcomingGames.length === 1 ? '' : 's'
      }`
    }
    return `${upcomingGames.length} game${upcomingGames.length === 1 ? '' : 's'}`
  })()

  return (
    <>
      <Hero />
      <Container className="py-2 pb-4">
        {postedFromForm && (
          <Alert
            variant="success"
            dismissible
            onClose={() => navigate(location.pathname, { replace: true, state: {} })}
            className="text-start"
          >
            <strong>Game posted.</strong> {postedFromForm} is on the list and you are in as the
            first player.
          </Alert>
        )}

        <HowItWorks />

        <h2 className="h3 mb-2">Upcoming games</h2>
        <p className="text-secondary mb-2">Find and join pickup games on campus.</p>
        {total > 0 && (
          <p className="small text-secondary mb-3" role="status">
            {total} {total === 1 ? 'game' : 'games'} total · {openCount} with open spots
          </p>
        )}

        {upcomingGames.length > 0 && (
          <div className="mb-4 p-3 rounded border bg-body-tertiary bg-opacity-25">
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
              <p className="text-secondary small mb-0 mt-2" role="status">
                {resultLabel}
              </p>
            )}
          </div>
        )}

        {games.length === 0 ? (
          <Alert variant="info">No games posted yet. Be the first to post one!</Alert>
        ) : upcomingGames.length === 0 ? (
          <Alert variant="info">
            No upcoming games. The start time has passed for every game in your list, or you can
            post a new one.
          </Alert>
        ) : filtered.length === 0 ? (
          <EmptyState title="No games match your filters">
            <p className="mb-0">Try a different search or change skill / open-spots options.</p>
          </EmptyState>
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
