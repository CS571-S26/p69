import { Col, Container, Row } from 'react-bootstrap'
import { Link, useOutletContext } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import GameCard from '../components/GameCard.jsx'

function MyGamesPage() {
  const { games, joinedIds } = useOutletContext()
  const joined = new Set(joinedIds)
  const myGames = games.filter((g) => joined.has(g.id))

  return (
    <Container className="py-4">
      <h1 className="h2 mb-2">My games</h1>
      <p className="text-muted mb-4">Pickup games you’ve joined are listed here.</p>
      {myGames.length === 0 ? (
        <EmptyState title="You’re not in any games yet">
          <p className="mb-0">
            <Link to="/" className="text-decoration-none">
              Go to the home page
            </Link>{' '}
            to browse and join a game.
          </p>
        </EmptyState>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-3">
          {myGames.map((game) => (
            <Col key={game.id}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default MyGamesPage
