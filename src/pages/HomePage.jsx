import { Alert, Col, Container, Row } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import GameCard from '../components/GameCard.jsx'

function HomePage() {
  const { games } = useOutletContext()

  return (
    <Container className="py-4">
      <h1 className="h2">PickupPal</h1>
      <p className="lead">Find and join pickup games on campus!</p>

      <h2 className="h4 mt-4 mb-3">Upcoming games</h2>
      {games.length === 0 ? (
        <Alert variant="info">No games posted yet. Be the first to post one!</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-3">
          {games.map((game) => (
            <Col key={game.id}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default HomePage
