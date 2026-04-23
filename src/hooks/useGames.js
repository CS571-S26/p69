import { useCallback, useEffect, useReducer } from 'react'
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
    /* ignore corrupt localStorage */
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
    /* ignore corrupt localStorage */
  }
  return []
}

function initState() {
  return { games: readGames(), joinedIds: readJoinedIds() }
}

function gamesReducer(state, action) {
  switch (action.type) {
    case 'addGame':
      return {
        ...state,
        games: [
          ...state.games,
          {
            id: crypto.randomUUID(),
            joinedCount: 1,
            ...action.payload,
          },
        ],
      }
    case 'toggleJoin': {
      const { gameId } = action
      const game = state.games.find((g) => g.id === gameId)
      if (!game) return state
      const isJoined = state.joinedIds.includes(gameId)
      if (isJoined) {
        return {
          ...state,
          joinedIds: state.joinedIds.filter((id) => id !== gameId),
          games: state.games.map((g) =>
            g.id === gameId ? { ...g, joinedCount: Math.max(0, g.joinedCount - 1) } : g,
          ),
        }
      }
      if (game.joinedCount >= game.maxPlayers) return state
      return {
        ...state,
        joinedIds: [...state.joinedIds, gameId],
        games: state.games.map((g) =>
          g.id === gameId ? { ...g, joinedCount: g.joinedCount + 1 } : g,
        ),
      }
    }
    default:
      return state
  }
}

export function useGames() {
  const [{ games, joinedIds }, dispatch] = useReducer(gamesReducer, null, initState)

  useEffect(() => {
    try {
      localStorage.setItem(GAMES_KEY, JSON.stringify(games))
    } catch {
      /* ignore quota / private mode */
    }
  }, [games])

  useEffect(() => {
    try {
      localStorage.setItem(JOINED_KEY, JSON.stringify(joinedIds))
    } catch {
      /* ignore */
    }
  }, [joinedIds])

  const addGame = useCallback((payload) => {
    dispatch({ type: 'addGame', payload })
  }, [])

  const toggleJoin = useCallback((gameId) => {
    dispatch({ type: 'toggleJoin', gameId })
  }, [])

  return { games, addGame, joinedIds, toggleJoin }
}
