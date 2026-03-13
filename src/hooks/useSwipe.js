import { useRef, useCallback } from 'react'

/**
 * Custom hook to detect horizontal swipe gestures.
 * @param {Object} options
 * @param {Function} options.onSwipeLeft - Callback when swiping left (next)
 * @param {Function} options.onSwipeRight - Callback when swiping right (prev)
 * @param {number} [options.threshold=50] - Minimum horizontal distance for swipe
 * @returns {Object} { onTouchStart, onTouchEnd }
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }) {
  const touchStartRef = useRef(null)

  const onTouchStart = useCallback((e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }, [])

  const onTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    }

    const deltaX = touchStartRef.current.x - touchEnd.x
    const deltaY = touchStartRef.current.y - touchEnd.y

    // Ensure it's a horizontal swipe (deltaX > deltaY) and passes the threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        onSwipeLeft && onSwipeLeft()
      } else {
        onSwipeRight && onSwipeRight()
      }
    }

    touchStartRef.current = null
  }, [onSwipeLeft, onSwipeRight, threshold])

  return { onTouchStart, onTouchEnd }
}
