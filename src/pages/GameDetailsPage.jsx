import { useCallback, useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import GameDetails from '../components/GameDetails.jsx'

function buildGameUrl(gameId) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
  return new URL(`games/${gameId}`, window.location.origin + base).href
}

function GameDetailsPage() {
  const { id } = useParams()
  const { games, joinedIds, toggleJoin } = useOutletContext()
  const [copied, setCopied] = useState(false)

  const game = games.find((g) => g.id === id)

  const onToggleJoin = useCallback(() => {
    if (id) toggleJoin(id)
  }, [id, toggleJoin])

  const onCopyLink = useCallback(async () => {
    if (!id) return
    const url = buildGameUrl(id)
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [id])

  if (!game) {
    return (
      <Container className="py-4 text-start">
        <h1 className="h4">Game not found</h1>
        <Alert variant="warning" className="mb-0">
          We couldn’t find a game for this link.{' '}
          <Link to="/" className="alert-link">
            Back to home
          </Link>
        </Alert>
      </Container>
    )
  }

  const isJoined = joinedIds.includes(game.id)
  const isFull = game.joinedCount >= game.maxPlayers

  return (
    <Container className="py-4">
      <GameDetails
        game={game}
        isJoined={isJoined}
        isFull={isFull}
        onToggleJoin={onToggleJoin}
        onCopyLink={onCopyLink}
        copied={copied}
      />
    </Container>
  )
}

export default GameDetailsPage
