<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { lessons, getChapters } from '../lessons/index.js'
import { useProgress } from '../composables/useProgress.js'

const router = useRouter()
const { isDone } = useProgress()
const chapters = getChapters()

const totalDone = computed(() => lessons.filter(l => isDone(l.id)).length)
const progress  = computed(() => Math.round((totalDone.value / lessons.length) * 100))

function startLearning() {
  // Find first incomplete lesson
  const first = lessons.find(l => !isDone(l.id)) ?? lessons[0]
  router.push(`/lesson/${first.id}`)
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <div class="hero-logo">⚡</div>
      <h1>Learn Vue Interactively</h1>
      <p class="subtitle">
        Master Vue 3 through hands-on lessons. Edit code and see results instantly.
      </p>

      <div class="progress-section">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="progress-text">
          {{ totalDone }} of {{ lessons.length }} lessons completed ({{ progress }}%)
        </p>
      </div>

      <button class="start-btn primary" @click="startLearning">
        {{ totalDone > 0 ? 'Continue Learning →' : 'Start Learning →' }}
      </button>
    </div>

    <div class="chapters-grid">
      <div v-for="ch in chapters" :key="ch.chapter" class="chapter-card">
        <div class="ch-header">
          <span class="ch-num">{{ ch.chapter }}</span>
          <h3>{{ ch.title }}</h3>
        </div>
        <div class="ch-lessons">
          <button
            v-for="lesson in ch.lessons"
            :key="lesson.id"
            class="lesson-chip"
            :class="{ done: isDone(lesson.id) }"
            @click="router.push(`/lesson/${lesson.id}`)"
          >
            <span>{{ isDone(lesson.id) ? '✓' : '○' }}</span>
            {{ lesson.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  height: 100%;
  overflow-y: auto;
  padding: 40px 48px;
}

.hero {
  max-width: 560px;
  margin: 0 auto 48px;
  text-align: center;
}

.hero-logo {
  font-size: 3.5rem;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 20px #89b4fa88);
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 10px;
}

.subtitle {
  color: var(--text-dim);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
}

.progress-section {
  margin-bottom: 24px;
}
.progress-track {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--green));
  border-radius: 4px;
  transition: width 0.5s ease;
}
.progress-text {
  font-size: 0.82rem;
  color: var(--text-dim);
}

.start-btn {
  font-size: 1rem;
  padding: 0.65rem 1.8rem;
  border-radius: 8px;
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.chapter-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 18px;
}

.ch-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.ch-num {
  background: var(--accent);
  color: var(--surface);
  font-size: 0.72rem;
  font-weight: 800;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ch-header h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}

.ch-lessons {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.lesson-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 0.82rem;
  color: var(--text-dim);
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}
.lesson-chip:hover {
  border-color: var(--accent);
  color: var(--text);
  background: rgba(137, 180, 250, 0.07);
}
.lesson-chip.done {
  color: var(--green);
  border-color: rgba(166, 227, 161, 0.3);
}
</style>
