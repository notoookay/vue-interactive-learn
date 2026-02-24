export default [
  {
    id: 'intro-hello',
    chapter: 1,
    chapterTitle: 'Introduction',
    title: 'Hello, Vue!',
    theory: `# Hello, Vue!

Vue is a **progressive JavaScript framework** for building user interfaces. "Progressive" means you can adopt it gradually — use it for a small widget or build a full single-page application.

The key idea behind Vue is **reactivity**: when your data changes, the UI updates automatically. You don't manually query the DOM.

## Your First Vue App

Every Vue app starts with \`createApp()\`. You pass it a component definition and then call \`.mount('#app')\` to attach it to a DOM element.

\`\`\`js
import { createApp } from 'vue'

createApp({
  setup() {
    return { message: 'Hello, Vue!' }
  }
}).mount('#app')
\`\`\`

In the template, \`{{ }}\` renders any value returned from \`setup()\`.

## Your Task

The code on the right renders a greeting. Change the \`message\` value to say **"I'm learning Vue!"** and watch the preview update live.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  h1 { color: #89b4fa; }
</style>
</head>
<body>
<div id="app">
  <h1>{{ message }}</h1>
  <p>Welcome to Vue!</p>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const message = 'Hello, Vue!'   // ← Change this!
    return { message }
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
  h1 { color: #89b4fa; }
</style>
</head>
<body>
<div id="app">
  <h1>{{ message }}</h1>
  <p>Welcome to Vue!</p>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const message = "I'm learning Vue!"
    return { message }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Find the line with `const message = ...` inside `setup()`.',
      'Replace the string value with `"I\'m learning Vue!"` — then the preview updates instantly.',
    ],
  },
  {
    id: 'intro-setup',
    chapter: 1,
    chapterTitle: 'Introduction',
    title: 'The setup() Function',
    theory: `# The setup() Function

\`setup()\` is the heart of the **Composition API** — the modern way to write Vue components. Every value or function you return from \`setup()\` is available in the template.

\`\`\`js
createApp({
  setup() {
    const name = 'Alice'
    const age  = 30

    function greet() {
      return \`Hi, I'm \${name}\`
    }

    return { name, age, greet }  // ← exposed to template
  }
})
\`\`\`

You can expose **multiple values**, **computed strings**, or **functions** — the template can use any of them.

## Your Task

The starter code exposes \`name\` and \`year\`. Add a third value \`language\` set to \`'Vue 3'\` and display it in the template inside a \`<p>\` tag.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .card { background: #313244; border-radius: 10px; padding: 16px; max-width: 280px; }
  .card h2 { color: #89b4fa; margin-bottom: 8px; }
  .card p { color: #a6adc8; margin: 4px 0; }
</style>
</head>
<body>
<div id="app">
  <div class="card">
    <h2>{{ name }}</h2>
    <p>Year: {{ year }}</p>
    <!-- Add a <p> that shows language here -->
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const name = 'Vue Developer'
    const year = 2024
    // Add a 'language' variable here

    return { name, year } // Add language to this return!
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
  .card { background: #313244; border-radius: 10px; padding: 16px; max-width: 280px; }
  .card h2 { color: #89b4fa; margin-bottom: 8px; }
  .card p { color: #a6adc8; margin: 4px 0; }
</style>
</head>
<body>
<div id="app">
  <div class="card">
    <h2>{{ name }}</h2>
    <p>Year: {{ year }}</p>
    <p>Language: {{ language }}</p>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const name = 'Vue Developer'
    const year = 2024
    const language = 'Vue 3'

    return { name, year, language }
  }
}).mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Add `const language = \'Vue 3\'` inside `setup()`, below the other variables.',
      'Don\'t forget to include `language` in the `return { }` object.',
      'In the template add `<p>Language: {{ language }}</p>` where the comment is.',
    ],
  },
]
