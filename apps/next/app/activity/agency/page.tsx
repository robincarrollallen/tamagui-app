'use client'

import { UserDetailScreen } from 'app/features/user/detail-screen'
import { useSearchParams } from 'next/navigation'

export default function GameCategoryPage() {
  const { id } = useSearchParams() as unknown as { id: string }
  return <UserDetailScreen id={id} />
}
