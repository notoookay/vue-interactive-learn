export default [
  {
    id: 'comp-what',
    chapter: 6,
    chapterTitle: 'Composables',
    title: 'What Are Composables?',
    theory: `# Composables — Reusable Logic

A **composable** is a function that uses Vue's Composition API to encapsulate and reuse **stateful logic**. Think of it as a custom hook (if you know React).

Instead of copy-pasting logic across components, you extract it:

\`\`\`js
// useCounter.js
import { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset     = () => count.value = initial
  return { count, increment, decrement, reset }
}
\`\`\`

Any component can now import and use it:

\`\`\`js
import { useCounter } from './useCounter.js'

const { count, increment, reset } = useCounter(10)
\`\`\`

## Your Task

The \`useCounter\` composable is defined inline in the script. Add a \`double\` computed property inside it that returns \`count.value * 2\`. Display it in the template.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .box { background: #313244; border-radius: 12px; padding: 24px; max-width: 260px; text-align: center; }
  h2 { color: #89b4fa; margin-bottom: 4px; }
  .count { font-size: 3.5rem; font-weight: bold; color: #cba6f7; margin: 12px 0; }
  .double { color: #a6adc8; font-size: 0.9rem; margin-bottom: 16px; }
  .btns { display: flex; gap: 10px; justify-content: center; }
  button { font-size: 1.2rem; padding: 8px 18px; }
</style>
</head>
<body>
<div id="app">
  <div class="box">
    <h2>Counter</h2>
    <div class="count">{{ count }}</div>
    <div class="double">Double: <!-- show double here --></div>
    <div class="btns">
      <button @click="decrement">−</button>
      <button @click="reset">↺</button>
      <button @click="increment">+</button>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// This is a composable!
function useCounter(initial = 0) {
  const count     = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset     = () => { count.value = initial }
  // Add: const double = computed(...)

  return { count, increment, decrement, reset } // add double here
}

createApp({
  setup() {
    const { count, increment, decrement, reset } = useCounter(5)
    return { count, increment, decrement, reset }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .box { background: #313244; border-radius: 12px; padding: 24px; max-width: 260px; text-align: center; }
  h2 { color: #89b4fa; margin-bottom: 4px; }
  .count { font-size: 3.5rem; font-weight: bold; color: #cba6f7; margin: 12px 0; }
  .double { color: #a6adc8; font-size: 0.9rem; margin-bottom: 16px; }
  .btns { display: flex; gap: 10px; justify-content: center; }
  button { font-size: 1.2rem; padding: 8px 18px; }
</style>
</head>
<body>
<div id="app">
  <div class="box">
    <h2>Counter</h2>
    <div class="count">{{ count }}</div>
    <div class="double">Double: {{ double }}</div>
    <div class="btns">
      <button @click="decrement">−</button>
      <button @click="reset">↺</button>
      <button @click="increment">+</button>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

function useCounter(initial = 0) {
  const count     = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset     = () => { count.value = initial }
  const double    = computed(() => count.value * 2)

  return { count, increment, decrement, reset, double }
}

createApp({
  setup() {
    const { count, increment, decrement, reset, double } = useCounter(5)
    return { count, increment, decrement, reset, double }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Add `const double = computed(() => count.value * 2)` inside `useCounter`.',
      'Include `double` in the `return` object of `useCounter`.',
      'Destructure `double` in `setup()` and add it to its `return`.',
      'In the template replace the comment with `{{ double }}`.',
    ],
  },
  {
    id: 'comp-usefetch',
    chapter: 6,
    chapterTitle: 'Composables',
    title: 'Building useFetch',
    theory: `# Building a Real Composable: useFetch

A classic composable is **\`useFetch\`** — it encapsulates the loading/error/data pattern for any fetch call.

\`\`\`js
function useFetch(url) {
  const data    = ref(null)
  const loading = ref(true)
  const error   = ref(null)

  onMounted(async () => {
    try {
      const res  = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
\`\`\`

The component just calls it and gets reactive state back — no duplication.

## Your Task

The \`useFetch\` composable fetches posts from a public API. Add **error handling**: if the fetch fails, set \`error.value\`. Display an error message in the template when \`error\` is non-null. Try breaking the URL to test it!
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  h2 { color: #89b4fa; margin-bottom: 12px; }
  .post { background: #313244; border-radius: 8px; padding: 12px 16px; margin: 8px 0; }
  .post h3 { color: #cba6f7; margin: 0 0 6px; font-size: 0.95rem; }
  .post p  { color: #a6adc8; margin: 0; font-size: 0.85rem; line-height: 1.5; }
  .spinner { display: inline-block; width: 22px; height: 22px; border: 3px solid #45475a;
             border-top-color: #89b4fa; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .error { color: #f38ba8; background: #3d1a23; padding: 12px; border-radius: 8px; }
</style>
</head>
<body>
<div id="app">
  <h2>Latest Posts</h2>
  <div v-if="loading" style="display:flex;align-items:center;gap:10px;color:#a6adc8">
    <div class="spinner"></div> Fetching posts...
  </div>
  <!-- Show error div here if error is non-null -->
  <div v-else>
    <div class="post" v-for="post in data.slice(0,5)" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

function useFetch(url) {
  const data    = ref(null)
  const loading = ref(true)
  const error   = ref(null)   // will hold error message

  onMounted(async () => {
    // Add try/catch/finally here
    const res  = await fetch(url)
    data.value = await res.json()
    loading.value = false
  })

  return { data, loading, error }
}

createApp({
  setup() {
    // Try changing to a broken URL to test error handling
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')
    return { data, loading, error }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  h2 { color: #89b4fa; margin-bottom: 12px; }
  .post { background: #313244; border-radius: 8px; padding: 12px 16px; margin: 8px 0; }
  .post h3 { color: #cba6f7; margin: 0 0 6px; font-size: 0.95rem; }
  .post p  { color: #a6adc8; margin: 0; font-size: 0.85rem; line-height: 1.5; }
  .spinner { display: inline-block; width: 22px; height: 22px; border: 3px solid #45475a;
             border-top-color: #89b4fa; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .error { color: #f38ba8; background: #3d1a23; padding: 12px; border-radius: 8px; }
</style>
</head>
<body>
<div id="app">
  <h2>Latest Posts</h2>
  <div v-if="loading" style="display:flex;align-items:center;gap:10px;color:#a6adc8">
    <div class="spinner"></div> Fetching posts...
  </div>
  <div v-else-if="error" class="error">Error: {{ error }}</div>
  <div v-else>
    <div class="post" v-for="post in data.slice(0,5)" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

function useFetch(url) {
  const data    = ref(null)
  const loading = ref(true)
  const error   = ref(null)

  onMounted(async () => {
    try {
      const res  = await fetch(url)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}

createApp({
  setup() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')
    return { data, loading, error }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Wrap the fetch in `try { ... } catch (e) { error.value = e.message } finally { loading.value = false }`.',
      'In the template add `<div v-else-if="error" class="error">Error: {{ error }}</div>` between the loading div and the posts div.',
      'Change the URL to `\'https://broken-url.invalid\'` to test error handling.',
    ],
  },
]
