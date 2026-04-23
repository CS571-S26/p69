import { Alert, Col, Container, Row } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import GameCard from '../components/GameCard.jsx'
import Hero from '../components/Hero.jsx'

function HomePage() {
  const { games } = useOutletContext()

  return (
    <>
      <Hero />
      <Container className="py-2 pb-4">
      <h2 className="h3 mb-2">Upcoming games</h2>
      <p className="text-muted mb-4">Find and join pickup games on campus.</p>
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
    </>
  )
}

export default HomePage
