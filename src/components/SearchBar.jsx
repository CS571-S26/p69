import { Form, InputGroup } from 'react-bootstrap'

function SearchBar({ value, onChange, id = 'home-search' }) {
  return (
    <Form.Group controlId={id} className="mb-0">
      <Form.Label className="visually-hidden">Search by sport or location</Form.Label>
      <InputGroup>
        <InputGroup.Text aria-hidden="true">🔍</InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search by sport or location…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </InputGroup>
    </Form.Group>
  )
}

export default SearchBar
