import { memo, useEffect, useRef } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const visibleRef = useRef(false)
  const interactiveRef = useRef(false)
  const pressedRef = useRef(false)
  const frameIdRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    document.body.classList.add('cursor-enhanced')

    const target = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      dotScale: 1,
      ringScale: 1,
    }
    const dot = { x: target.x, y: target.y, scale: 1 }
    const ring = { x: target.x, y: target.y, scale: 1 }

    const setCursorVisible = (nextValue) => {
      if (visibleRef.current === nextValue) {
        return
      }

      visibleRef.current = nextValue

      const nextOpacity = nextValue ? '1' : '0'
      if (dotRef.current) {
        dotRef.current.style.opacity = nextOpacity
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = nextOpacity
      }
    }

    const updateScaleTargets = () => {
      if (pressedRef.current) {
        target.dotScale = 0.9
        target.ringScale = 1.18
        return
      }

      if (interactiveRef.current) {
        target.dotScale = 0.95
        target.ringScale = 1.08
        return
      }

      target.dotScale = 1
      target.ringScale = 1
    }

    const handleMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      if (event.target instanceof Element) {
        interactiveRef.current = Boolean(event.target.closest(interactiveSelector))
        updateScaleTargets()
      }
      setCursorVisible(true)

      if (frameIdRef.current == null) {
        frameIdRef.current = requestAnimationFrame(animate)
      }
    }

    const handleLeave = () => {
      setCursorVisible(false)
      interactiveRef.current = false
      pressedRef.current = false
      updateScaleTargets()
    }

    const interactiveSelector = 'a, button, input, textarea, select, label, [role="button"], .cursor-hover'

    const handleMouseDown = () => {
      pressedRef.current = true
      updateScaleTargets()
    }

    const handleMouseUp = () => {
      pressedRef.current = false
      updateScaleTargets()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleLeave()
      }
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('mouseleave', handleLeave)
    window.addEventListener('pointercancel', handleLeave)
    document.addEventListener('pointerdown', handleMouseDown)
    document.addEventListener('pointerup', handleMouseUp)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleLeave)

    const animate = () => {
      dot.x = target.x
      dot.y = target.y
      dot.scale += (target.dotScale - dot.scale) * 0.42

      ring.x += (target.x - ring.x) * 0.72
      ring.y += (target.y - ring.y) * 0.72
      ring.scale += (target.ringScale - ring.scale) * 0.5

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) scale(${dot.scale})`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) scale(${ring.scale})`
      }

      if (visibleRef.current) {
        frameIdRef.current = requestAnimationFrame(animate)
      } else {
        frameIdRef.current = null
      }
    }

    return () => {
      if (frameIdRef.current != null) {
        cancelAnimationFrame(frameIdRef.current)
      }

      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('pointercancel', handleLeave)
      document.removeEventListener('pointerdown', handleMouseDown)
      document.removeEventListener('pointerup', handleMouseUp)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleLeave)
      document.body.classList.remove('cursor-enhanced')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  )
}

export default memo(CustomCursor)
