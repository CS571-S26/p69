import { Card } from 'react-bootstrap'

function EmptyState({ title, children, className = '' }) {
  return (
    <Card className={`border-0 bg-body-secondary text-center ${className}`}>
      <Card.Body className="py-4 px-3 text-muted">
        {title && <p className="h6 text-body mb-2 mb-md-3">{title}</p>}
        {children}
      </Card.Body>
    </Card>
  )
}

export default EmptyState
