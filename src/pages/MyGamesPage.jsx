import { Alert, Col, Container, Row } from 'react-bootstrap'
import { Link, useOutletContext } from 'react-router-dom'
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
        <Alert variant="info">
          You’re not in any games yet. Browse the{' '}
          <Link to="/" className="alert-link">
            home page
          </Link>{' '}
          to find one.
        </Alert>
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
