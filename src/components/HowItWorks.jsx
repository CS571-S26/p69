import { Card, Col, Row } from 'react-bootstrap'

const steps = [
  { title: 'Browse', text: 'Search and filter by sport, place, skill, or open spots.' },
  { title: 'Join or post', text: 'Save a spot or create a game. Your list is stored in this browser.' },
  { title: 'Show up', text: 'Use Copy link to share, then meet and play at the time and place.' },
]

function HowItWorks() {
  return (
    <section className="mb-4" aria-labelledby="how-it-works-title">
      <h2 className="h5 text-body mb-3" id="how-it-works-title">
        How it works
      </h2>
      <Row className="g-3">
        {steps.map((s) => (
          <Col md={4} key={s.title}>
            <Card className="h-100 border-0 bg-body-tertiary shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6 mb-2 text-body">
                  {s.title}
                </Card.Title>
                <Card.Text className="small text-secondary mb-0">{s.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default HowItWorks
