export default [
  {
    id: 'tmpl-interpolation',
    chapter: 2,
    chapterTitle: 'Template Syntax',
    title: 'Text Interpolation {{ }}',
    theory: `# Text Interpolation

The **double-curly-brace** syntax \`{{ }}\` lets you embed any JavaScript *expression* directly into the HTML template. Vue evaluates it and updates the DOM whenever the value changes.

\`\`\`html
<p>{{ message }}</p>
<p>{{ 1 + 1 }}</p>
<p>{{ name.toUpperCase() }}</p>
<p>{{ ok ? 'Yes' : 'No' }}</p>
\`\`\`

> Note: \`{{ }}\` works for **text content** only. To bind HTML attributes you'll use \`v-bind\` (next lesson).

## Your Task

The starter code shows a \`price\` and a \`discount\`. Add a third interpolation to display the **final price** using an expression: \`{{ price - discount }}\`.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .shop { background: #313244; padding: 20px; border-radius: 10px; max-width: 280px; }
  .shop h2 { color: #cba6f7; }
  .shop p { margin: 6px 0; color: #a6adc8; }
  .shop .total { color: #a6e3a1; font-weight: bold; font-size: 1.1rem; }
</style>
</head>
<body>
<div id="app">
  <div class="shop">
    <h2>{{ productName }}</h2>
    <p>Price: &#36;{{ price }}</p>
    <p>Discount: -&#36;{{ discount }}</p>
    <!-- Show the final price using an expression -->
    <p class="total">Final: &#36;<!-- your expression here --></p>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const productName = 'Vue Masterclass'
    const price = 99
    const discount = 20
    return { productName, price, discount }
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
  .shop { background: #313244; padding: 20px; border-radius: 10px; max-width: 280px; }
  .shop h2 { color: #cba6f7; }
  .shop p { margin: 6px 0; color: #a6adc8; }
  .shop .total { color: #a6e3a1; font-weight: bold; font-size: 1.1rem; }
</style>
</head>
<body>
<div id="app">
  <div class="shop">
    <h2>{{ productName }}</h2>
    <p>Price: &#36;{{ price }}</p>
    <p>Discount: -&#36;{{ discount }}</p>
    <p class="total">Final: &#36;{{ price - discount }}</p>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const productName = 'Vue Masterclass'
    const price = 99
    const discount = 20
    return { productName, price, discount }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Replace the comment with `{{ price - discount }}`.',
      'You can write any JavaScript expression inside `{{ }}` — arithmetic, method calls, ternaries, etc.',
    ],
  },
  {
    id: 'tmpl-vbind',
    chapter: 2,
    chapterTitle: 'Template Syntax',
    title: 'Binding Attributes (v-bind)',
    theory: `# v-bind — Dynamic Attributes

\`{{ }}\` renders text, but to make HTML *attributes* dynamic you use **\`v-bind\`** (or its shorthand **\`:\`**):

\`\`\`html
<!-- Long form -->
<img v-bind:src="imageUrl" v-bind:alt="imageAlt">

<!-- Shorthand (preferred) -->
<img :src="imageUrl" :alt="imageAlt">
<a :href="link">Click me</a>
<button :disabled="isLoading">Submit</button>
\`\`\`

You can bind **any** HTML attribute — \`class\`, \`style\`, \`href\`, \`src\`, \`disabled\`, etc.

### Dynamic Classes

\`\`\`html
<p :class="{ active: isActive, error: hasError }">Text</p>
\`\`\`

## Your Task

The \`<a>\` tag has a hardcoded \`href="#"\`. Bind it dynamically to the \`docsUrl\` variable so the link actually works. Also bind the \`<img>\` \`alt\` attribute to the \`logoAlt\` variable.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .links { display: flex; flex-direction: column; gap: 12px; max-width: 300px; }
  a { color: #89b4fa; display: flex; align-items: center; gap: 8px; }
  img { width: 24px; height: 24px; }
  .badge { background: #313244; border-radius: 6px; padding: 10px; }
</style>
</head>
<body>
<div id="app">
  <div class="links">
    <div class="badge">
      <!-- Bind :href to docsUrl and :alt to logoAlt -->
      <a href="#">
        <img src="https://vuejs.org/logo.svg" alt="logo">
        Vue Documentation
      </a>
    </div>
    <div class="badge" :class="{ active: isNew }">
      Status: {{ isNew ? 'New!' : 'Seen' }}
    </div>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const docsUrl = 'https://vuejs.org/guide/'
    const logoAlt = 'Vue.js logo'
    const isNew = true
    return { docsUrl, logoAlt, isNew }
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
  .links { display: flex; flex-direction: column; gap: 12px; max-width: 300px; }
  a { color: #89b4fa; display: flex; align-items: center; gap: 8px; }
  img { width: 24px; height: 24px; }
  .badge { background: #313244; border-radius: 6px; padding: 10px; }
</style>
</head>
<body>
<div id="app">
  <div class="links">
    <div class="badge">
      <a :href="docsUrl">
        <img src="https://vuejs.org/logo.svg" :alt="logoAlt">
        Vue Documentation
      </a>
    </div>
    <div class="badge" :class="{ active: isNew }">
      Status: {{ isNew ? 'New!' : 'Seen' }}
    </div>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const docsUrl = 'https://vuejs.org/guide/'
    const logoAlt = 'Vue.js logo'
    const isNew = true
    return { docsUrl, logoAlt, isNew }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Change `href="#"` to `:href="docsUrl"` to bind the attribute dynamically.',
      'Change `alt="logo"` to `:alt="logoAlt"`.',
      'The colon `:` is shorthand for `v-bind:` — both are equivalent.',
    ],
  },
  {
    id: 'tmpl-vif',
    chapter: 2,
    chapterTitle: 'Template Syntax',
    title: 'Conditional Rendering (v-if)',
    theory: `# v-if / v-else / v-show

**\`v-if\`** conditionally renders an element — if the expression is falsy, the element is removed from the DOM entirely.

\`\`\`html
<p v-if="isLoggedIn">Welcome back!</p>
<p v-else>Please log in.</p>
\`\`\`

You can chain conditions with **\`v-else-if\`**:

\`\`\`html
<p v-if="score >= 90">A</p>
<p v-else-if="score >= 80">B</p>
<p v-else>C</p>
\`\`\`

**\`v-show\`** is similar but uses CSS \`display: none\` — the element stays in the DOM. Use \`v-show\` when toggling frequently; use \`v-if\` when the condition rarely changes.

## Your Task

The starter shows a traffic light. Use \`v-if\` / \`v-else-if\` / \`v-else\` to display different messages based on the \`light\` variable: **"Stop"** for red, **"Caution"** for yellow, **"Go!"** for anything else.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .light-box { text-align: center; padding: 24px; background: #313244;
               border-radius: 12px; max-width: 220px; }
  .dot { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 16px; }
  .red    { background: #f38ba8; }
  .yellow { background: #f9e2af; }
  .green  { background: #a6e3a1; }
  .msg { font-size: 1.4rem; font-weight: bold; }
</style>
</head>
<body>
<div id="app">
  <div class="light-box">
    <div class="dot" :class="light"></div>
    <!-- Add v-if / v-else-if / v-else here to show the right message -->
    <p class="msg">???</p>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const light = 'red'   // try 'yellow' or 'green' too!
    return { light }
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
  .light-box { text-align: center; padding: 24px; background: #313244;
               border-radius: 12px; max-width: 220px; }
  .dot { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 16px; }
  .red    { background: #f38ba8; }
  .yellow { background: #f9e2af; }
  .green  { background: #a6e3a1; }
  .msg { font-size: 1.4rem; font-weight: bold; }
</style>
</head>
<body>
<div id="app">
  <div class="light-box">
    <div class="dot" :class="light"></div>
    <p v-if="light === 'red'" class="msg" style="color:#f38ba8">Stop</p>
    <p v-else-if="light === 'yellow'" class="msg" style="color:#f9e2af">Caution</p>
    <p v-else class="msg" style="color:#a6e3a1">Go!</p>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const light = 'red'
    return { light }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Remove the single `<p>???</p>` and replace it with three `<p>` tags.',
      'First `<p>` gets `v-if="light === \'red\'"`, second gets `v-else-if="light === \'yellow\'"`, third gets `v-else`.',
      'Change the value of `light` in `setup()` to test each branch.',
    ],
  },
  {
    id: 'tmpl-vfor',
    chapter: 2,
    chapterTitle: 'Template Syntax',
    title: 'List Rendering (v-for)',
    theory: `# v-for — Rendering Lists

**\`v-for\`** renders an element for each item in an array (or object):

\`\`\`html
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>
\`\`\`

Always provide a **\`:key\`** — it helps Vue efficiently update the list. Use a unique value like an \`id\`.

You can also access the **index**:

\`\`\`html
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }}. {{ item.name }}
</li>
\`\`\`

## Your Task

The \`skills\` array has 3 items. Render them as a \`<li>\` list using \`v-for\`. Show the index number before each skill (1-based). Then add a 4th skill of your choice to the array.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  h2 { color: #89b4fa; margin-bottom: 12px; }
  ul { list-style: none; padding: 0; }
  li { background: #313244; margin: 6px 0; padding: 10px 14px;
       border-radius: 8px; border-left: 3px solid #89b4fa; }
  .num { color: #cba6f7; margin-right: 8px; font-weight: bold; }
</style>
</head>
<body>
<div id="app">
  <h2>My Vue Skills</h2>
  <ul>
    <!-- Add v-for here to render each skill -->
    <li>Skill goes here</li>
  </ul>
  <p style="color:#a6adc8; margin-top:12px">Total skills: {{ skills.length }}</p>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const skills = [
      { id: 1, name: 'Template Syntax' },
      { id: 2, name: 'Reactivity' },
      { id: 3, name: 'Components' },
      // Add a 4th skill here!
    ]
    return { skills }
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
  ul { list-style: none; padding: 0; }
  li { background: #313244; margin: 6px 0; padding: 10px 14px;
       border-radius: 8px; border-left: 3px solid #89b4fa; }
  .num { color: #cba6f7; margin-right: 8px; font-weight: bold; }
</style>
</head>
<body>
<div id="app">
  <h2>My Vue Skills</h2>
  <ul>
    <li v-for="(skill, index) in skills" :key="skill.id">
      <span class="num">{{ index + 1 }}.</span> {{ skill.name }}
    </li>
  </ul>
  <p style="color:#a6adc8; margin-top:12px">Total skills: {{ skills.length }}</p>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const skills = [
      { id: 1, name: 'Template Syntax' },
      { id: 2, name: 'Reactivity' },
      { id: 3, name: 'Components' },
      { id: 4, name: 'Composables' },
    ]
    return { skills }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Change `<li>` to `<li v-for="(skill, index) in skills" :key="skill.id">`.',
      'Inside the `<li>`, use `{{ index + 1 }}` for the number and `{{ skill.name }}` for the name.',
      'To add a 4th skill, add `{ id: 4, name: \'Your Skill\' }` to the `skills` array.',
    ],
  },
  {
    id: 'tmpl-von',
    chapter: 2,
    chapterTitle: 'Template Syntax',
    title: 'Event Handling (v-on)',
    theory: `# v-on — Handling Events

**\`v-on\`** (shorthand: **\`@\`**) attaches event listeners to elements:

\`\`\`html
<button @click="count++">Click me</button>
<button @click="handleClick">Click me</button>
<input @input="onInput" @keyup.enter="submit">
\`\`\`

The handler can be an **inline expression** or a **method reference**.

### Event Modifiers

Vue provides handy modifiers to avoid boilerplate:

\`\`\`html
<form @submit.prevent="onSubmit">   <!-- preventDefault() -->
<a @click.stop="doThis">            <!-- stopPropagation() -->
<input @keyup.enter="submit">       <!-- only fires on Enter -->
\`\`\`

## Your Task

The starter has a static counter. Wire up the **+** and **−** buttons using \`@click\` so they increase/decrease \`count\`. Also add a "Reset" button that sets \`count\` back to \`0\`.

> Note: Because we haven't covered \`ref()\` yet, the count won't re-render on click — that's next lesson! For now focus on the event syntax.
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
      <!-- Add @click handlers to these buttons -->
      <button>−</button>
      <button>Reset</button>
      <button>+</button>
    </div>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    let count = 0    // Note: won't be reactive yet — next lesson!

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
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
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
    hints: [
      'Add `@click="increment"` to the + button, `@click="decrement"` to the − button.',
      'Add `@click="reset"` to the Reset button.',
      'The display won\'t update yet — `count` is not reactive. That\'s what `ref()` fixes in the next chapter!',
    ],
  },
]
