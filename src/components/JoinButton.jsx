import { Button } from 'react-bootstrap'

function JoinButton({ isJoined, isFull, onToggle, size, className = '' }) {
  if (isFull && !isJoined) {
    return (
      <Button
        type="button"
        variant="secondary"
        size={size}
        className={className}
        disabled
        aria-label="This game is full, cannot join"
      >
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
        aria-label="You joined this game, press to leave"
      >
        Joined
      </Button>
    )
  }
  return (
    <Button
      type="button"
      variant="primary"
      size={size}
      className={className}
      onClick={onToggle}
      aria-pressed="false"
      aria-label="Join this game"
    >
      Join
    </Button>
  )
}

export default JoinButton
