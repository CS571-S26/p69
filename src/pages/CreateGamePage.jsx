import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function combineDateAndTime(gameDate, hour12, minuteStr, meridiem) {
  if (!gameDate) return null
  const parts = gameDate.split('-').map(Number)
  if (parts.length !== 3) return null
  const [y, m, d] = parts
  let h = Number.parseInt(hour12, 10)
  const min = Number.parseInt(minuteStr, 10)
  if (Number.isNaN(h) || h < 1 || h > 12) return null
  if (Number.isNaN(min) || min < 0 || min > 59) return null

  if (meridiem === 'AM') {
    if (h === 12) h = 0
  } else if (h !== 12) {
    h += 12
  }

  const dt = new Date(y, m - 1, d, h, min, 0, 0)
  return Number.isNaN(dt.getTime()) ? null : dt
}

const emptyForm = () => ({
  sport: '',
  location: '',
  gameDate: '',
  hour12: '5',
  minute: '30',
  meridiem: 'PM',
  skillLevel: 'Casual',
  maxPlayers: '10',
})

function CreateGamePage() {
  const { addGame } = useOutletContext()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [validated, setValidated] = useState(false)
  const [timeInvalid, setTimeInvalid] = useState(false)

  function handleChange(field) {
    return (e) => {
      const { value } = e.target
      setForm((prev) => ({ ...prev, [field]: value }))
      if (['minute', 'hour12', 'meridiem', 'gameDate'].includes(field)) {
        setTimeInvalid(false)
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formEl = e.currentTarget
    if (!formEl.checkValidity()) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    const maxPlayers = Number.parseInt(form.maxPlayers, 10)
    if (Number.isNaN(maxPlayers) || maxPlayers < 2) {
      setValidated(true)
      return
    }

    const when = combineDateAndTime(form.gameDate, form.hour12, form.minute, form.meridiem)
    if (!when) {
      setValidated(true)
      setTimeInvalid(true)
      return
    }

    addGame({
      sport: form.sport.trim(),
      location: form.location.trim(),
      startsAt: when.toISOString(),
      skillLevel: form.skillLevel,
      maxPlayers,
    })

    setForm(emptyForm())
    setValidated(false)
    setTimeInvalid(false)
    navigate('/')
  }

  return (
    <Container className="py-4">
      <h1 className="h3 mb-3">Post a game</h1>
      <p className="text-muted mb-4">
        Add your pickup game so others can see it on the home page. (Saving to a server
        will come later; for now new games stay in this browser session.)
      </p>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="sport">
              <Form.Label>Sport</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Basketball"
                value={form.sport}
                onChange={handleChange('sport')}
              />
              <Form.Control.Feedback type="invalid">Enter a sport.</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Nick Gym"
                value={form.location}
                onChange={handleChange('location')}
              />
              <Form.Control.Feedback type="invalid">Enter a location.</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="gameDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                value={form.gameDate}
                onChange={handleChange('gameDate')}
                isInvalid={validated && !form.gameDate}
              />
              <Form.Control.Feedback type="invalid">Choose the day of the game.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="hour12" className="mt-3">
              <Form.Label>Time</Form.Label>
              <Row className="g-2 align-items-end">
                <Col xs={4}>
                  <Form.Control
                    type="number"
                    min={1}
                    max={12}
                    value={form.hour12}
                    onChange={handleChange('hour12')}
                    aria-label="Hour, 1 to 12"
                  />
                </Col>
                <Col xs={1} className="text-center pb-2">
                  :
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="number"
                    min={0}
                    max={59}
                    value={form.minute}
                    onChange={handleChange('minute')}
                    isInvalid={timeInvalid}
                    aria-label="Minute, 0 to 59"
                  />
                </Col>
                <Col xs={4}>
                  <Form.Select
                    value={form.meridiem}
                    onChange={handleChange('meridiem')}
                    aria-label="AM or PM"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </Form.Select>
                </Col>
              </Row>
              <Form.Text className="d-block mt-1">
                12-hour time (e.g. 5 : 30 with PM = 5:30 PM). Local time zone.
              </Form.Text>
              {timeInvalid && (
                <div className="text-danger small mt-1">Use hour 1–12 and minute 0–59.</div>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="skillLevel">
              <Form.Label>Skill level</Form.Label>
              <Form.Select value={form.skillLevel} onChange={handleChange('skillLevel')}>
                <option value="Casual">Casual</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Competitive">Competitive</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="maxPlayers">
              <Form.Label>Max players</Form.Label>
              <Form.Control
                required
                min={2}
                type="number"
                value={form.maxPlayers}
                onChange={handleChange('maxPlayers')}
                isInvalid={
                  validated &&
                  (Number.parseInt(form.maxPlayers, 10) < 2 ||
                    Number.isNaN(Number.parseInt(form.maxPlayers, 10)))
                }
              />
              <Form.Control.Feedback type="invalid">Use at least 2 players.</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Post game
        </Button>
      </Form>
    </Container>
  )
}

export default CreateGamePage
