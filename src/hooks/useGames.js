import { useCallback, useEffect, useState } from 'react'
import { INITIAL_GAMES } from '../data/mockGames.js'

const GAMES_KEY = 'pickuppal_games'
const JOINED_KEY = 'pickuppal_joined'

function readGames() {
  try {
    const raw = localStorage.getItem(GAMES_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch {
   
  }
  return [...INITIAL_GAMES]
}

function readJoinedIds() {
  try {
    const raw = localStorage.getItem(JOINED_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {

  }
  return []
}

export function useGames() {
  const [games, setGames] = useState(readGames)
  const [joinedIds, setJoinedIds] = useState(readJoinedIds)

  useEffect(() => {
    localStorage.setItem(GAMES_KEY, JSON.stringify(games))
  }, [games])

  useEffect(() => {
    localStorage.setItem(JOINED_KEY, JSON.stringify(joinedIds))
  }, [joinedIds])

  const addGame = useCallback((payload) => {
    setGames((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        joinedCount: 1,
        ...payload,
      },
    ])
  }, [])

  const toggleJoin = useCallback((gameId) => {
    setJoinedIds((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId)
      }
      return [...prev, gameId]
    })
  }, [])

  return { games, setGames, addGame, joinedIds, toggleJoin }
}
