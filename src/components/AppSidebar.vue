<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lessons, getChapters } from '../lessons/index.js'
import { useProgress } from '../composables/useProgress.js'

const route   = useRoute()
const router  = useRouter()
const { isDone } = useProgress()

const chapters = getChapters()
const currentId = computed(() => route.params.id)

function goLesson(id) {
  router.push(`/lesson/${id}`)
}

const totalDone = computed(() => lessons.filter(l => isDone(l.id)).length)
const progress  = computed(() => Math.round((totalDone.value / lessons.length) * 100))
</script>

<template>
  <aside class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Learn Vue</span>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="progress-label">{{ totalDone }}/{{ lessons.length }}</span>
      </div>
    </div>

    <!-- Lesson nav -->
    <nav class="sidebar-nav">
      <div v-for="ch in chapters" :key="ch.chapter" class="chapter">
        <div class="chapter-title">
          <span class="ch-num">{{ ch.chapter }}</span>
          {{ ch.title }}
        </div>
        <button
          v-for="lesson in ch.lessons"
          :key="lesson.id"
          class="lesson-btn"
          :class="{ active: lesson.id === currentId, done: isDone(lesson.id) }"
          @click="goLesson(lesson.id)"
        >
          <span class="check">{{ isDone(lesson.id) ? '✓' : '○' }}</span>
          {{ lesson.title }}
        </button>
      </div>
    </nav>

    <!-- Home link -->
    <div class="sidebar-footer">
      <RouterLink to="/" class="home-link">← Home</RouterLink>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-w);
  min-width: var(--sidebar-w);
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 14px 12px 10px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.logo-icon { font-size: 1.2rem; }
.logo-text  { font-size: 1rem; font-weight: 700; color: var(--accent); }

.progress-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.progress-bar {
  flex: 1;
  height: 5px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--green);
  border-radius: 3px;
  transition: width 0.4s ease;
}
.progress-label {
  font-size: 0.72rem;
  color: var(--text-dim);
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.chapter {
  margin-bottom: 4px;
}

.chapter-title {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px 4px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}
.ch-num {
  background: var(--border);
  color: var(--text-dim);
  font-size: 0.65rem;
  padding: 1px 5px;
  border-radius: 10px;
}

.lesson-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 7px 12px;
  background: none;
  border: none;
  border-radius: 0;
  color: var(--text-dim);
  font-size: 0.8rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.lesson-btn:hover {
  background: var(--surface2);
  color: var(--text);
  border-color: transparent;
}
.lesson-btn.active {
  background: rgba(137, 180, 250, 0.12);
  color: var(--accent);
  border: none;
}
.lesson-btn.done { color: var(--green); }
.lesson-btn.done .check { color: var(--green); }

.check {
  font-size: 0.75rem;
  width: 14px;
  flex-shrink: 0;
  color: var(--border);
}

.sidebar-footer {
  padding: 10px 12px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}
.home-link {
  font-size: 0.8rem;
  color: var(--text-dim);
}
.home-link:hover { color: var(--accent); }
</style>
