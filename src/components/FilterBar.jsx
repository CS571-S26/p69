import { Button, ButtonGroup, Form } from 'react-bootstrap'

const SKILLS = [
  { value: 'all', label: 'All' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Competitive', label: 'Competitive' },
]

function FilterBar({ skillFilter, onSkillFilterChange, openOnly, onOpenOnlyChange }) {
  return (
    <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 flex-wrap">
      <fieldset className="border-0 p-0 m-0 min-w-0">
        <legend className="small text-muted mb-1">Skill level</legend>
        <ButtonGroup size="sm" className="flex-wrap" role="group" aria-label="Filter games by skill level">
          {SKILLS.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant={skillFilter === value ? 'primary' : 'outline-secondary'}
              aria-pressed={skillFilter === value}
              onClick={() => onSkillFilterChange(value)}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </fieldset>
      <Form.Check
        type="checkbox"
        id="open-only"
        className="ms-md-2"
        label="Open spots only"
        checked={openOnly}
        onChange={(e) => onOpenOnlyChange(e.target.checked)}
      />
    </div>
  )
}

export default FilterBar
