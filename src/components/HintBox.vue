<script setup>
import { ref } from 'vue'

const props = defineProps({
  hints:    { type: Array, default: () => [] },
  solution: { type: String, default: '' },
})

const emit = defineEmits(['show-solution'])

const shownHints = ref(0)
const showSolution = ref(false)

function nextHint() {
  if (shownHints.value < props.hints.length) shownHints.value++
}

function revealSolution() {
  showSolution.value = true
  emit('show-solution', props.solution)
}
</script>

<template>
  <div class="hint-box">
    <div class="hint-actions">
      <button
        v-if="shownHints < hints.length"
        @click="nextHint"
        class="hint-btn"
      >
        💡 {{ shownHints === 0 ? 'Show Hint' : 'Next Hint' }}
        ({{ hints.length - shownHints }} left)
      </button>
      <span v-else-if="hints.length > 0" class="hints-done">All hints shown</span>

      <button
        v-if="!showSolution && solution"
        @click="revealSolution"
        class="solution-btn"
      >
        👁 Show Solution
      </button>
      <span v-else-if="showSolution" class="solution-loaded">✓ Solution loaded in editor</span>
    </div>

    <transition-group name="hint-fade" tag="div" class="hints-list">
      <div v-for="(hint, i) in hints.slice(0, shownHints)" :key="i" class="hint-item">
        <span class="hint-num">{{ i + 1 }}</span>
        {{ hint }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.hint-box {
  padding: 10px 14px;
  border-top: 1px solid var(--border);
  background: var(--surface);
  flex-shrink: 0;
}

.hint-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.hint-btn {
  font-size: 0.8rem;
  padding: 4px 10px;
  border-color: var(--yellow);
  color: var(--yellow);
}
.hint-btn:hover { background: rgba(249, 226, 175, 0.08); border-color: var(--yellow); }

.solution-btn {
  font-size: 0.8rem;
  padding: 4px 10px;
  border-color: var(--accent-2);
  color: var(--accent-2);
}
.solution-btn:hover { background: rgba(203, 166, 247, 0.08); border-color: var(--accent-2); }

.hints-done, .solution-loaded {
  font-size: 0.78rem;
  color: var(--text-dim);
}
.solution-loaded { color: var(--green); }

.hints-list {
  margin-top: 8px;
}

.hint-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 6px 0;
  font-size: 0.82rem;
  color: var(--text-dim);
  border-top: 1px solid var(--border);
}
.hint-num {
  background: var(--yellow);
  color: var(--surface);
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 0 6px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Transition */
.hint-fade-enter-active { transition: all 0.25s ease; }
.hint-fade-enter-from   { opacity: 0; transform: translateY(-6px); }
</style>
