export default [
  {
    id: 'react-ref',
    chapter: 3,
    chapterTitle: 'Reactivity',
    title: 'Reactive State with ref()',
    theory: `# ref() — Reactive Variables

In the last lesson the counter didn't update the display. That's because plain JS variables are **not reactive** — Vue doesn't know they changed. Enter **\`ref()\`**:

\`\`\`js
import { ref } from 'vue'

const count = ref(0)
\`\`\`

\`ref()\` wraps a value in a reactive container. Inside \`setup()\` you access the value via \`.value\`:

\`\`\`js
count.value++       // mutate
console.log(count.value)  // read
\`\`\`

In the **template** you skip \`.value\` — Vue unwraps refs automatically:

\`\`\`html
<p>{{ count }}</p>   <!-- No .value needed here! -->
\`\`\`

## Your Task

Fix the counter from last lesson! Replace \`let count = 0\` with \`const count = ref(0)\` and update the functions to use \`count.value\`. The display should now react to clicks.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .counter { text-align: center; background: #313244; border-radius: 12px;
             padding: 28px; max-width: 240px; }
  .count { font-size: 3rem; font-weight: bold; color: #89b4fa; margin: 16px 0; }
  .btns { display: flex; gap: 10px; justify-content: center; }
  button { font-size: 1.2rem; padding: 8px 20px; }
</style>
</head>
<body>
<div id="app">
  <div class="counter">
    <h2>Counter</h2>
    <div class="count">{{ count }}</div>
    <div class="btns">
      <button @click="decrement">−</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    // ❌ Change this to use ref() so the template updates!
    let count = 0

    function increment() { count++ }
    function decrement() { count-- }
    function reset()     { count = 0 }

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
  .counter { text-align: center; background: #313244; border-radius: 12px;
             padding: 28px; max-width: 240px; }
  .count { font-size: 3rem; font-weight: bold; color: #89b4fa; margin: 16px 0; }
  .btns { display: flex; gap: 10px; justify-content: center; }
  button { font-size: 1.2rem; padding: 8px 20px; }
</style>
</head>
<body>
<div id="app">
  <div class="counter">
    <h2>Counter</h2>
    <div class="count">{{ count }}</div>
    <div class="btns">
      <button @click="decrement">−</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const count = ref(0)

    function increment() { count.value++ }
    function decrement() { count.value-- }
    function reset()     { count.value = 0 }

    return { count, increment, decrement, reset }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Add `ref` to the import: `import { createApp, ref } from ...`',
      'Change `let count = 0` to `const count = ref(0)`.',
      'In each function, replace `count` with `count.value` (e.g., `count.value++`).',
    ],
  },
  {
    id: 'react-reactive',
    chapter: 3,
    chapterTitle: 'Reactivity',
    title: 'reactive() for Objects',
    theory: `# reactive() — Reactive Objects

\`ref()\` is perfect for primitive values. For **objects**, \`reactive()\` makes every property reactive automatically — no \`.value\` needed:

\`\`\`js
import { reactive } from 'vue'

const user = reactive({
  name: 'Alice',
  age: 30
})

// Mutate directly — Vue tracks changes
user.name = 'Bob'
user.age++
\`\`\`

In the template access properties directly:

\`\`\`html
<p>{{ user.name }} is {{ user.age }} years old</p>
\`\`\`

> **Tip:** \`ref()\` also works on objects — it calls \`reactive()\` internally. Prefer \`ref()\` for scalars, \`reactive()\` when you naturally group data.

## Your Task

The form below uses a plain object that isn't reactive. Convert \`form\` to use \`reactive()\` and bind the inputs using \`v-model\` (which is shorthand for \`:value\` + \`@input\`).
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .form { background: #313244; padding: 20px; border-radius: 10px; max-width: 300px; }
  .form h2 { color: #cba6f7; margin-bottom: 14px; }
  label { display: block; margin-bottom: 12px; color: #a6adc8; }
  input { display: block; width: 100%; margin-top: 4px; padding: 6px 10px;
          background: #1e1e2e; border: 1px solid #45475a; border-radius: 6px;
          color: #cdd6f4; font-size: 0.95rem; }
  .preview { margin-top: 14px; padding: 10px; background: #1e1e2e;
             border-radius: 8px; color: #a6e3a1; }
</style>
</head>
<body>
<div id="app">
  <div class="form">
    <h2>User Profile</h2>
    <label>
      Name
      <input v-model="form.name" placeholder="Enter name">
    </label>
    <label>
      City
      <input v-model="form.city" placeholder="Enter city">
    </label>
    <!-- Preview updates as you type -->
    <div class="preview">{{ form.name }} from {{ form.city }}</div>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    // ❌ This plain object is not reactive — make it reactive!
    const form = {
      name: '',
      city: '',
    }
    return { form }
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
  .form { background: #313244; padding: 20px; border-radius: 10px; max-width: 300px; }
  .form h2 { color: #cba6f7; margin-bottom: 14px; }
  label { display: block; margin-bottom: 12px; color: #a6adc8; }
  input { display: block; width: 100%; margin-top: 4px; padding: 6px 10px;
          background: #1e1e2e; border: 1px solid #45475a; border-radius: 6px;
          color: #cdd6f4; font-size: 0.95rem; }
  .preview { margin-top: 14px; padding: 10px; background: #1e1e2e;
             border-radius: 8px; color: #a6e3a1; }
</style>
</head>
<body>
<div id="app">
  <div class="form">
    <h2>User Profile</h2>
    <label>
      Name
      <input v-model="form.name" placeholder="Enter name">
    </label>
    <label>
      City
      <input v-model="form.city" placeholder="Enter city">
    </label>
    <div class="preview">{{ form.name }} from {{ form.city }}</div>
  </div>
</div>

<script type="module">
import { createApp, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const form = reactive({
      name: '',
      city: '',
    })
    return { form }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Import `reactive` alongside `createApp`.',
      'Wrap the object: `const form = reactive({ name: \'\', city: \'\' })`.',
      'The template already uses `v-model` — that\'s correct. You just need the data to be reactive.',
    ],
  },
  {
    id: 'react-computed',
    chapter: 3,
    chapterTitle: 'Reactivity',
    title: 'Computed Properties',
    theory: `# computed() — Derived State

A **computed property** is a value derived from other reactive state. It automatically re-evaluates whenever its dependencies change, and it **caches** the result (unlike a plain function).

\`\`\`js
import { ref, computed } from 'vue'

const firstName = ref('Ada')
const lastName  = ref('Lovelace')

const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)
// fullName.value → 'Ada Lovelace'
\`\`\`

In the template, computed refs are unwrapped automatically: \`{{ fullName }}\`.

**Use computed when:**
- A value is derived from other state
- You want efficient caching
- You want to keep templates simple

## Your Task

Add a computed property \`total\` that sums all item prices in the cart. Display it at the bottom of the cart. Also add a computed \`isEmpty\` that's \`true\` when the cart has no items.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .cart { background: #313244; border-radius: 12px; padding: 20px; max-width: 320px; }
  .cart h2 { color: #89b4fa; margin-bottom: 12px; }
  .item { display: flex; justify-content: space-between; padding: 8px 0;
          border-bottom: 1px solid #45475a; }
  .total-row { display: flex; justify-content: space-between; margin-top: 14px;
               font-weight: bold; color: #a6e3a1; font-size: 1.05rem; }
  .empty-msg { color: #a6adc8; font-style: italic; text-align: center; padding: 20px; }
</style>
</head>
<body>
<div id="app">
  <div class="cart">
    <h2>Shopping Cart</h2>

    <!-- Show empty-msg div if isEmpty, otherwise show items -->
    <div class="empty-msg" v-if="false">Cart is empty!</div>

    <div v-else>
      <div class="item" v-for="item in cart" :key="item.id">
        <span>{{ item.name }}</span>
        <span>&#36;{{ item.price }}</span>
      </div>
      <!-- Show total here using the computed property -->
      <div class="total-row">
        <span>Total</span>
        <span>&#36;???</span>
      </div>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const cart = ref([
      { id: 1, name: 'Vue Course', price: 49 },
      { id: 2, name: 'Vue T-Shirt', price: 25 },
      { id: 3, name: 'Vue Stickers', price: 5 },
    ])

    // Add computed properties here:
    // const total = computed(...)
    // const isEmpty = computed(...)

    return { cart }
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
  .cart { background: #313244; border-radius: 12px; padding: 20px; max-width: 320px; }
  .cart h2 { color: #89b4fa; margin-bottom: 12px; }
  .item { display: flex; justify-content: space-between; padding: 8px 0;
          border-bottom: 1px solid #45475a; }
  .total-row { display: flex; justify-content: space-between; margin-top: 14px;
               font-weight: bold; color: #a6e3a1; font-size: 1.05rem; }
  .empty-msg { color: #a6adc8; font-style: italic; text-align: center; padding: 20px; }
</style>
</head>
<body>
<div id="app">
  <div class="cart">
    <h2>Shopping Cart</h2>
    <div class="empty-msg" v-if="isEmpty">Cart is empty!</div>
    <div v-else>
      <div class="item" v-for="item in cart" :key="item.id">
        <span>{{ item.name }}</span>
        <span>&#36;{{ item.price }}</span>
      </div>
      <div class="total-row">
        <span>Total</span>
        <span>&#36;{{ total }}</span>
      </div>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const cart = ref([
      { id: 1, name: 'Vue Course', price: 49 },
      { id: 2, name: 'Vue T-Shirt', price: 25 },
      { id: 3, name: 'Vue Stickers', price: 5 },
    ])

    const total   = computed(() => cart.value.reduce((sum, i) => sum + i.price, 0))
    const isEmpty = computed(() => cart.value.length === 0)

    return { cart, total, isEmpty }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Import `computed` from vue: `import { createApp, ref, computed } from ...`',
      'For total: `const total = computed(() => cart.value.reduce((sum, i) => sum + i.price, 0))`',
      'For isEmpty: `const isEmpty = computed(() => cart.value.length === 0)`',
      'Replace `v-if="false"` with `v-if="isEmpty"` and `$???` with `{{ total }}`.',
    ],
  },
  {
    id: 'react-watch',
    chapter: 3,
    chapterTitle: 'Reactivity',
    title: 'Watchers',
    theory: `# watch() — Reacting to Changes

**\`watch()\`** runs a callback whenever a reactive source changes. Use it for **side effects** — fetching data, logging, syncing to localStorage, etc.

\`\`\`js
import { ref, watch } from 'vue'

const query = ref('')

watch(query, (newVal, oldVal) => {
  console.log('Changed from', oldVal, 'to', newVal)
  // fetch('/api/search?q=' + newVal)
})
\`\`\`

### watchEffect

\`watchEffect\` automatically tracks *all* reactive dependencies used inside it:

\`\`\`js
import { watchEffect } from 'vue'

watchEffect(() => {
  console.log('count is now', count.value)
})
\`\`\`

## Your Task

Add a \`watch\` on the \`name\` ref that pushes each new value into a \`history\` array. Render the history as a list below the input. The history should grow as you type.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .box { background: #313244; border-radius: 12px; padding: 20px; max-width: 320px; }
  h2 { color: #cba6f7; margin-bottom: 12px; }
  input { width: 100%; padding: 8px 12px; background: #1e1e2e; border: 1px solid #45475a;
          border-radius: 8px; color: #cdd6f4; font-size: 0.95rem; margin-bottom: 14px; }
  .hist { margin-top: 10px; }
  .hist h3 { font-size: 0.85rem; color: #a6adc8; margin-bottom: 6px; }
  .hist-item { background: #1e1e2e; border-radius: 6px; padding: 4px 10px;
               margin: 3px 0; font-size: 0.85rem; color: #89b4fa; }
</style>
</head>
<body>
<div id="app">
  <div class="box">
    <h2>Name Tracker</h2>
    <input v-model="name" placeholder="Type a name...">
    <p>Current: <strong>{{ name }}</strong></p>
    <div class="hist">
      <h3>Change History</h3>
      <!-- Render history items here -->
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const name    = ref('')
    const history = ref([])

    // Add watch(name, ...) here to push new values to history

    return { name, history }
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
  .box { background: #313244; border-radius: 12px; padding: 20px; max-width: 320px; }
  h2 { color: #cba6f7; margin-bottom: 12px; }
  input { width: 100%; padding: 8px 12px; background: #1e1e2e; border: 1px solid #45475a;
          border-radius: 8px; color: #cdd6f4; font-size: 0.95rem; margin-bottom: 14px; }
  .hist { margin-top: 10px; }
  .hist h3 { font-size: 0.85rem; color: #a6adc8; margin-bottom: 6px; }
  .hist-item { background: #1e1e2e; border-radius: 6px; padding: 4px 10px;
               margin: 3px 0; font-size: 0.85rem; color: #89b4fa; }
</style>
</head>
<body>
<div id="app">
  <div class="box">
    <h2>Name Tracker</h2>
    <input v-model="name" placeholder="Type a name...">
    <p>Current: <strong>{{ name }}</strong></p>
    <div class="hist">
      <h3>Change History</h3>
      <div v-for="(entry, i) in history" :key="i" class="hist-item">{{ entry }}</div>
    </div>
  </div>
</div>

<script type="module">
import { createApp, ref, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const name    = ref('')
    const history = ref([])

    watch(name, (newVal) => {
      if (newVal) history.value.push(newVal)
    })

    return { name, history }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Import `watch` from vue.',
      'Call `watch(name, (newVal) => { history.value.push(newVal) })` inside setup.',
      'In the template add `<div v-for="(entry, i) in history" :key="i" class="hist-item">{{ entry }}</div>` inside `.hist`.',
    ],
  },
]
