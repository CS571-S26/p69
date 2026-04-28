import { Badge, Button, Card, Col, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import JoinButton from './JoinButton.jsx'
import SportIcon from './SportIcon.jsx'

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

function formatRelativeStart(isoString) {
  const t = new Date(isoString).getTime() - Date.now()
  if (t < 0) return 'This time has already passed in your time zone.'

  const d = Math.floor(t / 86400000)
  const h = Math.floor((t % 86400000) / 3600000)
  if (d > 1) return `In about ${d} days`
  if (d === 1) return 'About a day from now'
  if (h > 1) return `In about ${h} hours`
  if (h === 1) return 'In about 1 hour'

  const m = Math.max(0, Math.floor((t % 3600000) / 60000))
  if (m > 5) return `In about ${m} minutes`
  if (m > 0) return 'Starting in a few minutes'
  return 'Starting very soon'
}

function GameDetails({ game, isJoined, isFull, onToggleJoin, onCopyLink, copied }) {
  const { sport, location, startsAt, skillLevel, maxPlayers, joinedCount, id } = game
  const pct = Math.min(100, Math.round((joinedCount / maxPlayers) * 100))
  const spotsLeft = Math.max(0, maxPlayers - joinedCount)

  let youLabel = 'Not on the list yet'
  if (isJoined) youLabel = 'You are in this game'
  else if (isFull) youLabel = 'Game is full'

  return (
    <div className="text-start">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div className="d-flex align-items-start gap-3 min-w-0">
          <SportIcon sport={sport} className="sport-icon-detail flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="h2 mb-2">{sport}</h1>
            <p className="text-secondary mb-0 fs-5">{location}</p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end gap-1">
          <Badge bg={isFull ? 'secondary' : 'success'} className="fs-6">
            {isFull ? 'Full' : 'Open'}
          </Badge>
          {isJoined && (
            <Badge bg="info" text="dark" className="text-wrap text-end">
              You are on the roster
            </Badge>
          )}
        </div>
      </div>

      <Card className="mb-3 border-0 bg-body-tertiary">
        <Card.Header as="h2" className="h6 py-3 text-body">
          At a glance
        </Card.Header>
        <Card.Body className="pt-0">
          <Row className="g-3">
            <Col sm={6}>
              <div className="text-secondary small">When</div>
              <div className="small text-body mt-1">{formatWhen(startsAt)}</div>
              <div className="small text-secondary mt-1">{formatRelativeStart(startsAt)}</div>
            </Col>
            <Col sm={6}>
              <div className="text-secondary small">Skill</div>
              <Badge bg="light" text="dark" className="mt-1">
                {skillLevel}
              </Badge>
            </Col>
            <Col sm={6}>
              <div className="text-secondary small">Spots left</div>
              <div className="small text-body mt-1">
                {isFull
                  ? '0'
                  : `${spotsLeft} of ${maxPlayers} (${joinedCount} joined)`}
              </div>
            </Col>
            <Col sm={6}>
              <div className="text-secondary small">You</div>
              <div className="small text-body mt-1">{youLabel}</div>
            </Col>
            <Col xs={12}>
              <div className="text-secondary small">Share ID</div>
              <code className="share-id-text small d-block text-break mt-1 p-1 rounded border bg-body">
                {id}
              </code>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="mb-2">
        <div className="d-flex justify-content-between small text-secondary mb-1">
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

      <p className="text-secondary small mt-3 mb-0">
        Use the buttons below to join or leave, or copy a link to share with others.
      </p>

      <div className="d-flex flex-wrap gap-2 mt-2">
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
