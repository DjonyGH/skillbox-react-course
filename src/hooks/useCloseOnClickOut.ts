import { useEffect, useRef} from 'react'

export function useCloseOnClickOut(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) onClose?.()
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  return [ref]
}
