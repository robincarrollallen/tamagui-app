'use client'

import { useSearchParams } from 'next/navigation'
import { GameSearchScreen } from 'app/features/game/search'

export default function GameCategoryPage() {
  const searchParams = useSearchParams()
  const type = searchParams?.get('type')
  const id = searchParams?.get('id')

  return <GameSearchScreen type={type as string} id={id as string} />
}
