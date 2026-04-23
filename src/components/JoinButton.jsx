import { Button } from 'react-bootstrap'

function JoinButton({ isJoined, isFull, onToggle, size, className = '' }) {
  if (isFull && !isJoined) {
    return (
      <Button type="button" variant="secondary" size={size} className={className} disabled>
        Full
      </Button>
    )
  }
  if (isJoined) {
    return (
      <Button
        type="button"
        variant="outline-success"
        size={size}
        className={className}
        onClick={onToggle}
        aria-pressed="true"
        title="Leave this game"
      >
        Joined
      </Button>
    )
  }
  return (
    <Button type="button" variant="primary" size={size} className={className} onClick={onToggle} aria-pressed="false">
      Join
    </Button>
  )
}

export default JoinButton
