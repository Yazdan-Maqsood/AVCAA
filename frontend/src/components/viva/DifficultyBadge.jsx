import Badge from '../common/Badge'

export default function DifficultyBadge({ level }) {
  const colorMap = {
    Basic: 'green',
    Intermediate: 'yellow',
    Advanced: 'red'
  }
  return <Badge color={colorMap[level] || 'blue'}>{level}</Badge>
}