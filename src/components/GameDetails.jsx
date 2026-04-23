import { Badge, Button, Col, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import JoinButton from './JoinButton.jsx'

function formatWhen(isoString) {
  const d = new Date(isoString)
  return d.toLocaleString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function GameDetails({ game, isJoined, isFull, onToggleJoin, onCopyLink, copied }) {
  const { sport, location, startsAt, skillLevel, maxPlayers, joinedCount, id } = game
  const pct = Math.min(100, Math.round((joinedCount / maxPlayers) * 100))
  return (
    <div className="text-start">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h1 className="h2 mb-2">{sport}</h1>
          <p className="text-muted mb-0 fs-5">{location}</p>
        </div>
        <Badge bg={isFull ? 'secondary' : 'success'} className="fs-6">
          {isFull ? 'Full' : 'Open'}
        </Badge>
      </div>

      <p className="mb-3">{formatWhen(startsAt)}</p>

      <Row className="g-3 mb-3">
        <Col sm={6}>
          <div className="text-muted small">Skill level</div>
          <Badge bg="light" text="dark" className="mt-1">
            {skillLevel}
          </Badge>
        </Col>
        <Col sm={6}>
          <div className="text-muted small">Game ID</div>
          <code className="small d-block text-break mt-1">{id}</code>
        </Col>
      </Row>

      <div className="mb-2">
        <div className="d-flex justify-content-between small text-muted mb-1">
          <span>Players</span>
          <span>
            {joinedCount} / {maxPlayers}
          </span>
        </div>
        <ProgressBar
          now={pct}
          variant={isFull ? 'secondary' : 'primary'}
          label={`${joinedCount}/${maxPlayers}`}
          className="mb-0"
        />
      </div>

      <div className="d-flex flex-wrap gap-2 mt-4">
        <JoinButton isJoined={isJoined} isFull={isFull} onToggle={onToggleJoin} />
        <Button type="button" variant="outline-secondary" onClick={onCopyLink}>
          {copied ? 'Link copied' : 'Copy link'}
        </Button>
        <Button as={Link} to="/" variant="link" className="px-0">
          ← All games
        </Button>
      </div>
    </div>
  )
}

export default GameDetails
