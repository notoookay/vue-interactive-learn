import { ref } from 'vue'

const STORAGE_KEY = 'vue-learn-progress'

function loadSaved() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

// Module-level state so all components share the same reactive set
const _completed = ref(loadSaved())

export function useProgress() {
  function markDone(id) {
    _completed.value = new Set([..._completed.value, id])
    localStorage.setItem(STORAGE_KEY, JSON.stringify([..._completed.value]))
  }

  function unmark(id) {
    const next = new Set(_completed.value)
    next.delete(id)
    _completed.value = next
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
  }

  function isDone(id) {
    return _completed.value.has(id)
  }

  function reset() {
    _completed.value = new Set()
    localStorage.removeItem(STORAGE_KEY)
  }

  return { completed: _completed, markDone, unmark, isDone, reset }
}
