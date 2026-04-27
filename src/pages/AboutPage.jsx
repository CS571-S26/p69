import { Badge, Card, Col, Container, Row } from 'react-bootstrap'

const features = [
  'Browse upcoming pickup games in a responsive grid',
  'Post new games with date, time, skill level, and capacity',
  'Primary navigation across Home, Post, and About',
  'Client-side state (with more features added in later milestones)',
]

const stack = ['React 19', 'Vite', 'React Router', 'React Bootstrap', 'GitHub Pages']

function AboutPage() {
  return (
    <Container className="py-4 text-start">
      <h1 className="h2 mb-3">About PickupPal</h1>
      <p className="lead text-muted mb-4">
        PickupPal helps students find casual sports games on campus (basketball, soccer, volleyball,
        and more) without endless group chats.
      </p>

      <h2 className="h4 mb-3">At a glance</h2>
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="h5" as="h3">
                Mission
              </Card.Title>
              <Card.Text>
                We want getting a game together to be as easy as checking the weather: see what’s
                happening, join what fits, or start something new.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="h5" as="h3">
                Tech stack
              </Card.Title>
              <div className="d-flex flex-wrap gap-2">
                {stack.map((item) => (
                  <Badge key={item} bg="primary" className="fw-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="h4 mb-3">What you can do (so far)</h2>
      <ul className="list-unstyled">
        {features.map((f) => (
          <li key={f} className="d-flex gap-2 mb-2">
            <span aria-hidden="true">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default AboutPage
