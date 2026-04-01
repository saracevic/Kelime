import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'spelling_progress_v1'

export function useProgress() {
  const [progress, setProgress] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProgress(JSON.parse(raw))
    } catch (e) {}
    setLoaded(true)
  }, [])

  const save = useCallback((next) => {
    setProgress(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
  }, [])

  const setStatus = useCallback((word, status) => {
    setProgress(prev => {
      const next = { ...prev }
      if (status === null) delete next[word]
      else next[word] = { status, updatedAt: Date.now() }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
      return next
    })
  }, [])

  const cycleStatus = useCallback((word) => {
    setProgress(prev => {
      const current = prev[word]?.status
      const next = { ...prev }
      if (!current) next[word] = { status: 'learning', updatedAt: Date.now() }
      else if (current === 'learning') next[word] = { status: 'known', updatedAt: Date.now() }
      else delete next[word]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
      return next
    })
  }, [])

  const reset = useCallback(() => {
    save({})
  }, [save])

  const getStatus = useCallback((word) => progress[word]?.status || null, [progress])

  const stats = useCallback((words) => {
    const known = words.filter(w => progress[w.en]?.status === 'known').length
    const learning = words.filter(w => progress[w.en]?.status === 'learning').length
    return { known, learning, total: words.length, pct: Math.round(known / words.length * 100) }
  }, [progress])

  return { progress, loaded, setStatus, cycleStatus, reset, getStatus, stats }
}
