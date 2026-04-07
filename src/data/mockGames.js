export const INITIAL_GAMES = [
  {
    id: '1',
    sport: 'Basketball',
    location: 'Nick Gym',
    startsAt: new Date(Date.now() + 86400000).toISOString(),
    skillLevel: 'Intermediate',
    maxPlayers: 10,
    joinedCount: 4,
  },
  {
    id: '2',
    sport: 'Soccer',
    location: 'Near West Field',
    startsAt: new Date(Date.now() + 86400000 * 2 + 18 * 3600000).toISOString(),
    skillLevel: 'Casual',
    maxPlayers: 14,
    joinedCount: 9,
  },
  {
    id: '3',
    sport: 'Volleyball',
    location: 'Bakke Recreation',
    startsAt: new Date(Date.now() + 86400000 * 3 + 19 * 3600000).toISOString(),
    skillLevel: 'Competitive',
    maxPlayers: 12,
    joinedCount: 12,
  },
]
