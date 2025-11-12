'use client'

import { useSearchParams } from 'next/navigation'
import { GameListScreen } from 'app/features/game/list'

export default function GameCategoryPage() {
  const searchParams = useSearchParams()
  const type = searchParams?.get('type')
  const id = searchParams?.get('id')

  return <GameListScreen type={type as string} id={id as string} />
}
