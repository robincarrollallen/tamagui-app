import { usePathname as useSolitoPathname } from 'solito/navigation'

export function usePathname(): string {
  return useSolitoPathname() || ''
}