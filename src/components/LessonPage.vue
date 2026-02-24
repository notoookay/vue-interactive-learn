<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import CodeEditor from './CodeEditor.vue'
import LivePreview from './LivePreview.vue'
import HintBox from './HintBox.vue'
import { lessons, getLessonById } from '../lessons/index.js'
import { useProgress } from '../composables/useProgress.js'

const route  = useRoute()
const router = useRouter()
const { isDone, markDone } = useProgress()
const md = new MarkdownIt({ html: false, breaks: true, linkify: true })

const lesson = computed(() => getLessonById(route.params.id))
const code   = ref('')

// Reset editor code when lesson changes
watch(lesson, (l) => {
  if (l) code.value = l.starterCode
}, { immediate: true })

const theoryHtml = computed(() =>
  lesson.value ? md.render(lesson.value.theory) : ''
)

const currentIndex = computed(() => lessons.findIndex(l => l.id === route.params.id))
const prevLesson   = computed(() => lessons[currentIndex.value - 1] ?? null)
const nextLesson   = computed(() => lessons[currentIndex.value + 1] ?? null)

function onShowSolution(solutionCode) {
  code.value = solutionCode
}

function markComplete() {
  if (lesson.value) markDone(lesson.value.id)
}
</script>

<template>
  <div v-if="lesson" class="lesson-page">
    <!-- Theory pane -->
    <section class="theory-pane">
      <div class="theory-scroll">
        <div class="chapter-badge">Chapter {{ lesson.chapter }} · {{ lesson.chapterTitle }}</div>
        <div class="prose" v-html="theoryHtml" />
      </div>

      <!-- Navigation + Mark done -->
      <div class="theory-footer">
        <button
          v-if="isDone(lesson.id)"
          class="done-badge success"
          disabled
        >
          ✓ Completed
        </button>
        <button v-else class="done-btn" @click="markComplete">Mark as Done</button>

        <div class="nav-btns">
          <button v-if="prevLesson" @click="router.push(`/lesson/${prevLesson.id}`)">← Prev</button>
          <button v-if="nextLesson" class="primary" @click="router.push(`/lesson/${nextLesson.id}`)">Next →</button>
        </div>
      </div>
    </section>

    <!-- Editor + Preview pane -->
    <section class="work-pane">
      <div class="editor-area">
        <div class="pane-bar">
          <span>Editor</span>
          <button @click="code = lesson.starterCode" title="Reset to starter code" style="font-size:0.75rem">↺ Reset</button>
        </div>
        <CodeEditor v-model="code" class="editor-fill" />
      </div>

      <div class="preview-area">
        <LivePreview :code="code" class="preview-fill" />
        <HintBox
          :hints="lesson.hints"
          :solution="lesson.solution"
          @show-solution="onShowSolution"
        />
      </div>
    </section>
  </div>

  <div v-else class="not-found">
    <h2>Lesson not found</h2>
    <RouterLink to="/">← Back to Home</RouterLink>
  </div>
</template>

<style scoped>
.lesson-page {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* ── Theory pane ──────────────────────────────── */
.theory-pane {
  width: var(--theory-w);
  min-width: var(--theory-w);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
}

.theory-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 20px 18px;
}

.chapter-badge {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--accent-2);
  margin-bottom: 10px;
}

.theory-footer {
  padding: 10px 14px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 8px;
}
.nav-btns { display: flex; gap: 8px; }
.done-btn { font-size: 0.8rem; padding: 5px 12px; }
.done-badge { font-size: 0.8rem; padding: 5px 12px; cursor: default; opacity: 0.85; }

/* ── Work pane (editor + preview) ────────────── */
.work-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--border);
  min-height: 0;
}

.pane-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.editor-fill { flex: 1; min-height: 0; }

.preview-area {
  height: 42%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-fill { flex: 1; min-height: 0; }

/* ── Not found ────────────────────────────────── */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: var(--text-dim);
}
</style>
