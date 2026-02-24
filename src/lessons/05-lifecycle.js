export default [
  {
    id: 'lc-mounted',
    chapter: 5,
    chapterTitle: 'Lifecycle Hooks',
    title: 'onMounted',
    theory: `# onMounted — After the DOM Is Ready

**Lifecycle hooks** let you run code at specific stages of a component's life.

\`onMounted\` runs **after** Vue has inserted the component's DOM into the page. It's ideal for:
- Fetching initial data from an API
- Initializing third-party libraries that need a DOM element
- Starting timers or animations

\`\`\`js
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  // Safe to access the DOM here
  const res = await fetch('/api/items')
  data.value = await res.json()
})
\`\`\`

> \`onMounted\` only runs on the **client**. It never runs during server-side rendering.

## Your Task

Add \`onMounted\` to simulate fetching a list of users. Set \`loading\` to \`false\` after a 1-second delay and populate \`users\` with mock data. Show a loading spinner while waiting.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  h2 { color: #89b4fa; margin-bottom: 12px; }
  .user { background: #313244; border-radius: 8px; padding: 10px 14px; margin: 6px 0;
          display: flex; align-items: center; gap: 10px; }
  .avatar { font-size: 1.4rem; }
  .spinner { display: inline-block; width: 24px; height: 24px; border: 3px solid #45475a;
             border-top-color: #89b4fa; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { color: #a6adc8; display: flex; align-items: center; gap: 10px; }
</style>
</head>
<body>
<div id="app">
  <h2>Users</h2>
  <div v-if="loading" class="loading-text">
    <div class="spinner"></div> Loading...
  </div>
  <div v-else>
    <div class="user" v-for="user in users" :key="user.id">
      <span class="avatar">{{ user.avatar }}</span>
      <div>
        <div><strong>{{ user.name }}</strong></div>
        <div style="color:#a6adc8; font-size:0.85rem">{{ user.role }}</div>
      </div>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const loading = ref(true)
    const users   = ref([])

    // Add onMounted here — after 1 second, set loading to false
    // and populate users with mock data

    return { loading, users }
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
  .user { background: #313244; border-radius: 8px; padding: 10px 14px; margin: 6px 0;
          display: flex; align-items: center; gap: 10px; }
  .avatar { font-size: 1.4rem; }
  .spinner { display: inline-block; width: 24px; height: 24px; border: 3px solid #45475a;
             border-top-color: #89b4fa; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { color: #a6adc8; display: flex; align-items: center; gap: 10px; }
</style>
</head>
<body>
<div id="app">
  <h2>Users</h2>
  <div v-if="loading" class="loading-text">
    <div class="spinner"></div> Loading...
  </div>
  <div v-else>
    <div class="user" v-for="user in users" :key="user.id">
      <span class="avatar">{{ user.avatar }}</span>
      <div>
        <div><strong>{{ user.name }}</strong></div>
        <div style="color:#a6adc8; font-size:0.85rem">{{ user.role }}</div>
      </div>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const loading = ref(true)
    const users   = ref([])

    onMounted(() => {
      setTimeout(() => {
        users.value = [
          { id: 1, name: 'Alice Chen',   role: 'Frontend Dev', avatar: '👩‍💻' },
          { id: 2, name: 'Bob Kumar',    role: 'Backend Dev',  avatar: '👨‍💻' },
          { id: 3, name: 'Carol Smith',  role: 'DevOps',       avatar: '🧑‍💻' },
        ]
        loading.value = false
      }, 1000)
    })

    return { loading, users }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Import `onMounted` from vue.',
      'Call `onMounted(() => { ... })` inside `setup()`.',
      'Inside the callback, use `setTimeout(() => { ... }, 1000)` to simulate a delay.',
      'Set `users.value = [...]` with mock user objects and then `loading.value = false`.',
    ],
  },
  {
    id: 'lc-cleanup',
    chapter: 5,
    chapterTitle: 'Lifecycle Hooks',
    title: 'onUnmounted — Cleanup',
    theory: `# onUnmounted — Cleaning Up

Just as \`onMounted\` sets things up, **\`onUnmounted\`** tears them down. Always clean up intervals, event listeners, and subscriptions to avoid memory leaks:

\`\`\`js
import { ref, onMounted, onUnmounted } from 'vue'

const seconds = ref(0)
let timer

onMounted(() => {
  timer = setInterval(() => { seconds.value++ }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)   // ← essential cleanup!
})
\`\`\`

\`onUpdated\` fires after the component re-renders due to a state change (useful for measuring the DOM after updates).

## Your Task

The starter has a clock that should tick every second. Add \`onMounted\` to start the interval and \`onUnmounted\` to clear it. Toggle the clock visibility with the button to see cleanup in action (check the browser console — the interval should stop when hidden).
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .clock-wrap { text-align: center; max-width: 280px; }
  .clock { background: #313244; border-radius: 16px; padding: 28px;
           font-size: 2.8rem; font-weight: bold; color: #89b4fa;
           letter-spacing: 3px; margin: 16px 0; font-family: monospace; }
  button { margin-top: 8px; }
</style>
</head>
<body>
<div id="app">
  <div class="clock-wrap">
    <h2 style="color:#cba6f7">Live Clock</h2>
    <button @click="show = !show">{{ show ? 'Hide' : 'Show' }} Clock</button>
    <!-- The Clock component is defined below -->
    <Clock v-if="show" />
  </div>
</div>

<script type="module">
import { createApp, ref, onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() {
    const show = ref(true)
    return { show }
  }
})

app.component('Clock', {
  setup() {
    const time = ref(new Date().toLocaleTimeString())

    // Add onMounted to start a 1-second interval that updates time
    // Add onUnmounted to clear the interval

    return { time }
  },
  template: '<div class="clock">{{ time }}</div>'
})

app.mount('#app')
<\/script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .clock-wrap { text-align: center; max-width: 280px; }
  .clock { background: #313244; border-radius: 16px; padding: 28px;
           font-size: 2.8rem; font-weight: bold; color: #89b4fa;
           letter-spacing: 3px; margin: 16px 0; font-family: monospace; }
  button { margin-top: 8px; }
</style>
</head>
<body>
<div id="app">
  <div class="clock-wrap">
    <h2 style="color:#cba6f7">Live Clock</h2>
    <button @click="show = !show">{{ show ? 'Hide' : 'Show' }} Clock</button>
    <Clock v-if="show" />
  </div>
</div>

<script type="module">
import { createApp, ref, onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() {
    const show = ref(true)
    return { show }
  }
})

app.component('Clock', {
  setup() {
    const time = ref(new Date().toLocaleTimeString())
    let timer

    onMounted(() => {
      timer = setInterval(() => {
        time.value = new Date().toLocaleTimeString()
      }, 1000)
    })

    onUnmounted(() => {
      clearInterval(timer)
      console.log('Clock unmounted — interval cleared!')
    })

    return { time }
  },
  template: '<div class="clock">{{ time }}</div>'
})

app.mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Declare `let timer` above the hooks.',
      'In `onMounted`, set `timer = setInterval(() => { time.value = new Date().toLocaleTimeString() }, 1000)`.',
      'In `onUnmounted`, call `clearInterval(timer)`.',
    ],
  },
]
