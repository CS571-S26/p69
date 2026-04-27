import { Card } from 'react-bootstrap'

function EmptyState({ title, children, className = '', titleLevel = 3 }) {
  const TitleTag = titleLevel === 2 ? 'h2' : 'h3'
  return (
    <Card className={`border-0 bg-body-secondary text-center ${className}`}>
      <Card.Body className="py-4 px-3 text-muted">
        {title && (
          <TitleTag className="h6 text-body mb-2 mb-md-3">
            {title}
          </TitleTag>
        )}
        {children}
      </Card.Body>
    </Card>
  )
}

export default EmptyState
