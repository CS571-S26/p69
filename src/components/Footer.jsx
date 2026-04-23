import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="border-top mt-auto py-4 text-muted small">
      <Container className="text-center">
        <p className="mb-1">PickupPal — find pickup games on campus.</p>
        <p className="mb-0">Built for CS571 · React · Vite · React Bootstrap</p>
      </Container>
    </footer>
  )
}

export default Footer
