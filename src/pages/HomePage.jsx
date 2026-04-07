import { Container } from 'react-bootstrap'

function HomePage() {
  return (
    <Container className="py-4">
      <h1>PickupPal</h1>
      <p className="lead">Find and join pickup games on campus!</p>

      <h2 className="h4 mt-4">Upcoming Games</h2>
      <ul>
        <li>Basketball @ Nick - 5pm</li>
        <li>Soccer @ Near West - 6pm</li>
        <li>Volleyball @ Bakke - 7pm</li>
      </ul>
    </Container>
  )
}

export default HomePage
