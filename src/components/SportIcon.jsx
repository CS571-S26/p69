function iconForSport(sport) {
  const s = String(sport).trim().toLowerCase()
  if (s.includes('basket')) return '🏀'
  if (s.includes('soccer')) return '⚽'
  if (s.includes('volley')) return '🏐'
  if (s.includes('football')) return '🏈'
  if (s.includes('tennis')) return '🎾'
  if (s.includes('ultimate') || s.includes('frisbee') || s.includes('disc')) return '🥏'
  if (s.includes('baseball')) return '⚾'
  if (s.includes('softball')) return '🥎'
  if (s.includes('hockey')) return '🏒'
  if (s.includes('pickle')) return '🏓'
  if (s.includes('badminton')) return '🏸'
  if (s.includes('run')) return '🏃'
  if (s.includes('cricket')) return '🏏'
  return '🎯'
}

function SportIcon({ sport, className = '' }) {
  const emoji = iconForSport(sport)
  return (
    <span className={`sport-icon ${className}`.trim()} aria-hidden="true">
      {emoji}
    </span>
  )
}

export default SportIcon
