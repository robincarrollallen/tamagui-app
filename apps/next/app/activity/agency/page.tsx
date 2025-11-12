'use client'

import { UserDetailScreen } from 'app/features/user/detail-screen'
import { useSearchParams } from 'next/navigation'

export default function GameCategoryPage() {
  const searchParams = useSearchParams()
  const id = searchParams?.get('id')
  return <UserDetailScreen id={id as string} />
}
