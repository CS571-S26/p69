import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="hero-section bg-body-tertiary border-bottom py-5 mb-4">
      <Container>
        <Row className="align-items-center gy-4">
          <Col md={7} className="text-md-start text-center">
            <h1 className="display-5 fw-semibold mb-3 text-black">Find your next pickup game</h1>
            <p className="lead text-muted mb-4">
              Browse games near you, post your own, and meet people who want to play.
            </p>
            <div className="d-flex flex-wrap gap-2 justify-content-md-start justify-content-center">
              <Button as={Link} to="/post" variant="primary" size="lg">
                Post a game
              </Button>
              <Button as={Link} to="/about" variant="outline-secondary" size="lg">
                Why PickupPal?
              </Button>
            </div>
          </Col>
          <Col md={5} className="text-center">
            <div className="rounded-3 bg-primary bg-opacity-10 p-4 text-primary fs-1">🏀 ⚽ 🏐</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
