import { Badge, Button, Card, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function formatWhen(isoString) {
  const d = new Date(isoString)
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function GameCard({ game }) {
  const { id, sport, location, startsAt, skillLevel, maxPlayers, joinedCount } = game
  const full = joinedCount >= maxPlayers
  const pct = Math.min(100, Math.round((joinedCount / maxPlayers) * 100))

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Card.Title className="h5 mb-0" as="h3">
            <Link to={`/games/${id}`} className="text-decoration-none text-body">
              {sport}
            </Link>
          </Card.Title>
          <Badge bg={full ? 'secondary' : 'success'}>{full ? 'Full' : 'Open'}</Badge>
        </div>
        <Card.Subtitle className="text-muted mb-2">{location}</Card.Subtitle>
        <Card.Text className="small mb-2">{formatWhen(startsAt)}</Card.Text>
        <div className="d-flex justify-content-between align-items-center small mb-1">
          <span className="text-muted">Skill</span>
          <Badge bg="light" text="dark">
            {skillLevel}
          </Badge>
        </div>
        <div className="small text-muted mb-1">
          Players: {joinedCount} / {maxPlayers}
        </div>
        <ProgressBar
          now={pct}
          variant={full ? 'secondary' : 'primary'}
          label={`${joinedCount}/${maxPlayers}`}
          visuallyHidden
        />
        <Button as={Link} to={`/games/${id}`} variant="outline-primary" size="sm" className="mt-3 w-100">
          View details
        </Button>
      </Card.Body>
    </Card>
  )
}

export default GameCard
