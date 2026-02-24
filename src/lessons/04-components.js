export default [
  {
    id: 'comp-basics',
    chapter: 4,
    chapterTitle: 'Components',
    title: 'Defining Components',
    theory: `# Components — Reusable Building Blocks

A **component** is a self-contained, reusable piece of UI. Vue apps are trees of components.

In a CDN-based setup you define a component as a plain object and register it with \`app.component()\`:

\`\`\`js
const app = createApp({ /* root component */ })

app.component('MyButton', {
  template: '<button class="btn">Click me</button>'
})

app.mount('#app')
\`\`\`

Then use it in the template like a custom HTML element:

\`\`\`html
<MyButton />
<my-button />   <!-- both work; Vue normalizes casing -->
\`\`\`

Components can have their own \`setup()\`, data, styles, etc.

## Your Task

A \`<UserCard>\` component is partially defined. Complete its \`template\` to show an avatar emoji, the name, and the role. Then use the component twice in the root template with different \`name\` and \`role\` props.

> Props are covered next — for now just hard-code two cards.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .cards { display: flex; gap: 14px; flex-wrap: wrap; }
  .card { background: #313244; border-radius: 12px; padding: 18px 24px;
          min-width: 180px; text-align: center; }
  .avatar { font-size: 2.5rem; margin-bottom: 8px; }
  .name { font-weight: bold; color: #89b4fa; }
  .role { font-size: 0.85rem; color: #a6adc8; margin-top: 4px; }
</style>
</head>
<body>
<div id="app">
  <h2 style="color:#cba6f7; margin-bottom:16px">Team</h2>
  <div class="cards">
    <!-- Use UserCard here (twice!) -->
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() { return {} }
})

// Complete this component's template
app.component('UserCard', {
  template: \`
    <div class="card">
      <!-- Add avatar, name, and role here -->
    </div>
  \`
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
  .cards { display: flex; gap: 14px; flex-wrap: wrap; }
  .card { background: #313244; border-radius: 12px; padding: 18px 24px;
          min-width: 180px; text-align: center; }
  .avatar { font-size: 2.5rem; margin-bottom: 8px; }
  .name { font-weight: bold; color: #89b4fa; }
  .role { font-size: 0.85rem; color: #a6adc8; margin-top: 4px; }
</style>
</head>
<body>
<div id="app">
  <h2 style="color:#cba6f7; margin-bottom:16px">Team</h2>
  <div class="cards">
    <UserCard />
    <UserCard />
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() { return {} }
})

app.component('UserCard', {
  template: \`
    <div class="card">
      <div class="avatar">👨‍💻</div>
      <div class="name">Alice</div>
      <div class="role">Frontend Dev</div>
    </div>
  \`
})

app.mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Add `<div class="avatar">👩‍💻</div>`, `<div class="name">Alice</div>`, `<div class="role">Engineer</div>` inside the card template.',
      'To use the component, add `<UserCard />` or `<user-card />` inside `.cards` in the root template.',
      'Add it twice with different content to show two cards.',
    ],
  },
  {
    id: 'comp-props',
    chapter: 4,
    chapterTitle: 'Components',
    title: 'Props',
    theory: `# Props — Passing Data to Components

**Props** let a parent component pass data *down* to a child. The child declares what it accepts using the \`props\` option:

\`\`\`js
app.component('UserCard', {
  props: ['name', 'role', 'avatar'],
  template: \`
    <div class="card">
      <span>{{ avatar }}</span>
      <strong>{{ name }}</strong>
      <em>{{ role }}</em>
    </div>
  \`
})
\`\`\`

The parent passes values as HTML attributes:

\`\`\`html
<UserCard name="Alice" role="Engineer" avatar="👩‍💻" />
<UserCard :name="dynamicName" :role="someVar" />
\`\`\`

> Props flow **one-way** — from parent to child. The child should never mutate a prop directly.

## Your Task

Add a \`badge\` prop to \`UserCard\` and pass a different badge color to each card. Display the badge as a small colored dot.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .cards { display: flex; gap: 14px; flex-wrap: wrap; }
  .card { background: #313244; border-radius: 12px; padding: 18px 24px;
          min-width: 180px; text-align: center; position: relative; }
  .avatar { font-size: 2.5rem; margin-bottom: 6px; }
  .name { font-weight: bold; color: #89b4fa; }
  .role { font-size: 0.85rem; color: #a6adc8; margin-top: 4px; }
  .badge { width: 12px; height: 12px; border-radius: 50%; display: inline-block;
           margin-left: 6px; vertical-align: middle; }
</style>
</head>
<body>
<div id="app">
  <div class="cards">
    <UserCard name="Alice" role="Frontend Dev" avatar="👩‍💻" badge="#a6e3a1" />
    <UserCard name="Bob"   role="Backend Dev"  avatar="👨‍💻" badge="#89b4fa" />
    <UserCard name="Carol" role="DevOps"        avatar="🧑‍💻" badge="#f9e2af" />
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({ setup() { return {} } })

app.component('UserCard', {
  props: ['name', 'role', 'avatar'], // Add 'badge' here
  template: \`
    <div class="card">
      <div class="avatar">{{ avatar }}</div>
      <div class="name">
        {{ name }}
        <!-- Add a span with class="badge" and :style="{ background: badge }" here -->
      </div>
      <div class="role">{{ role }}</div>
    </div>
  \`
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
  .cards { display: flex; gap: 14px; flex-wrap: wrap; }
  .card { background: #313244; border-radius: 12px; padding: 18px 24px;
          min-width: 180px; text-align: center; position: relative; }
  .avatar { font-size: 2.5rem; margin-bottom: 6px; }
  .name { font-weight: bold; color: #89b4fa; }
  .role { font-size: 0.85rem; color: #a6adc8; margin-top: 4px; }
  .badge { width: 12px; height: 12px; border-radius: 50%; display: inline-block;
           margin-left: 6px; vertical-align: middle; }
</style>
</head>
<body>
<div id="app">
  <div class="cards">
    <UserCard name="Alice" role="Frontend Dev" avatar="👩‍💻" badge="#a6e3a1" />
    <UserCard name="Bob"   role="Backend Dev"  avatar="👨‍💻" badge="#89b4fa" />
    <UserCard name="Carol" role="DevOps"        avatar="🧑‍💻" badge="#f9e2af" />
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({ setup() { return {} } })

app.component('UserCard', {
  props: ['name', 'role', 'avatar', 'badge'],
  template: \`
    <div class="card">
      <div class="avatar">{{ avatar }}</div>
      <div class="name">
        {{ name }}
        <span class="badge" :style="{ background: badge }"></span>
      </div>
      <div class="role">{{ role }}</div>
    </div>
  \`
})

app.mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'Add `\'badge\'` to the `props` array: `props: [\'name\', \'role\', \'avatar\', \'badge\']`.',
      'In the template add `<span class="badge" :style="{ background: badge }"></span>` next to the name.',
      'The parent already passes the `badge` color — you just need to declare and use it in the child.',
    ],
  },
  {
    id: 'comp-emits',
    chapter: 4,
    chapterTitle: 'Components',
    title: 'Emits — Child to Parent',
    theory: `# Emits — Communicating Up

Props flow **down** (parent → child). To send information **up** (child → parent), the child **emits** an event:

\`\`\`js
app.component('LikeButton', {
  emits: ['liked'],
  setup(props, { emit }) {
    function like() {
      emit('liked', { timestamp: Date.now() })
    }
    return { like }
  },
  template: '<button @click="like">♥ Like</button>'
})
\`\`\`

The parent listens with \`@event-name\`:

\`\`\`html
<LikeButton @liked="handleLike" />
\`\`\`

\`\`\`js
function handleLike(payload) {
  console.log('Liked at', payload.timestamp)
}
\`\`\`

## Your Task

A \`<TodoItem>\` component shows a task. Add a "Done" button that **emits** a \`'done'\` event with the item's \`id\`. In the parent, handle it by removing that item from the list.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  h2 { color: #89b4fa; margin-bottom: 12px; }
  .todo-item { display: flex; align-items: center; justify-content: space-between;
               background: #313244; border-radius: 8px; padding: 10px 14px; margin: 6px 0; }
  .todo-item span { color: #cdd6f4; }
  button.done-btn { background: #a6e3a1; color: #1e1e2e; border: none;
                    padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>
</head>
<body>
<div id="app">
  <h2>Todo List ({{ todos.length }} remaining)</h2>
  <!-- Listen for @done event here and call removeTodo -->
  <TodoItem
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
  />
</div>

<script type="module">
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() {
    const todos = ref([
      { id: 1, text: 'Learn Vue basics' },
      { id: 2, text: 'Build a component' },
      { id: 3, text: 'Master reactivity' },
    ])

    // Add removeTodo(id) function here
    function removeTodo(id) {
      todos.value = todos.value.filter(t => t.id !== id)
    }

    return { todos, removeTodo }
  }
})

app.component('TodoItem', {
  props: ['todo'],
  emits: ['done'],
  setup(props, { emit }) {
    // Add a function that calls emit('done', props.todo.id)
    return {}
  },
  template: \`
    <div class="todo-item">
      <span>{{ todo.text }}</span>
      <!-- Add @click to this button that emits 'done' -->
      <button class="done-btn">✓ Done</button>
    </div>
  \`
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
  h2 { color: #89b4fa; margin-bottom: 12px; }
  .todo-item { display: flex; align-items: center; justify-content: space-between;
               background: #313244; border-radius: 8px; padding: 10px 14px; margin: 6px 0; }
  .todo-item span { color: #cdd6f4; }
  button.done-btn { background: #a6e3a1; color: #1e1e2e; border: none;
                    padding: 4px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>
</head>
<body>
<div id="app">
  <h2>Todo List ({{ todos.length }} remaining)</h2>
  <TodoItem
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    @done="removeTodo"
  />
</div>

<script type="module">
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() {
    const todos = ref([
      { id: 1, text: 'Learn Vue basics' },
      { id: 2, text: 'Build a component' },
      { id: 3, text: 'Master reactivity' },
    ])

    function removeTodo(id) {
      todos.value = todos.value.filter(t => t.id !== id)
    }

    return { todos, removeTodo }
  }
})

app.component('TodoItem', {
  props: ['todo'],
  emits: ['done'],
  setup(props, { emit }) {
    function complete() { emit('done', props.todo.id) }
    return { complete }
  },
  template: \`
    <div class="todo-item">
      <span>{{ todo.text }}</span>
      <button class="done-btn" @click="complete">✓ Done</button>
    </div>
  \`
})

app.mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'In the child\'s `setup`, create `function complete() { emit(\'done\', props.todo.id) }` and return it.',
      'In the child\'s template, add `@click="complete"` to the button.',
      'In the parent template, add `@done="removeTodo"` to the `<TodoItem>` element.',
    ],
  },
  {
    id: 'comp-slots',
    chapter: 4,
    chapterTitle: 'Components',
    title: 'Slots — Content Injection',
    theory: `# Slots — Flexible Content

**Slots** let a parent inject arbitrary HTML *into* a child component. The child uses \`<slot>\` as a placeholder:

\`\`\`js
// Child component
app.component('Card', {
  template: \`
    <div class="card">
      <slot />    <!-- parent content goes here -->
    </div>
  \`
})
\`\`\`

\`\`\`html
<!-- Parent -->
<Card>
  <h2>Hello!</h2>
  <p>Any content can go here.</p>
</Card>
\`\`\`

### Named Slots

\`\`\`html
<!-- Child -->
<div class="card">
  <header><slot name="header" /></header>
  <main><slot /></main>
</div>

<!-- Parent -->
<Card>
  <template #header><h2>Title</h2></template>
  <p>Body content</p>
</Card>
\`\`\`

## Your Task

The \`<Panel>\` component has an unnamed slot. Add a **named slot** called \`"header"\` above it. Then update both usages in the parent to pass a \`<template #header>\` with different titles.
`,
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 24px; background: #1e1e2e; color: #cdd6f4; }
  .panels { display: flex; gap: 16px; flex-wrap: wrap; }
  .panel { background: #313244; border-radius: 12px; overflow: hidden; min-width: 220px; }
  .panel-header { background: #45475a; padding: 12px 16px; }
  .panel-header h3 { margin: 0; color: #89b4fa; }
  .panel-body { padding: 16px; color: #a6adc8; line-height: 1.6; }
</style>
</head>
<body>
<div id="app">
  <div class="panels">
    <!-- Pass a #header template to each Panel -->
    <Panel>
      <p>Vue is a progressive framework for building user interfaces.</p>
    </Panel>
    <Panel>
      <p>The Composition API makes logic reuse easy and scalable.</p>
    </Panel>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({ setup() { return {} } })

app.component('Panel', {
  template: \`
    <div class="panel">
      <div class="panel-header">
        <!-- Add a named slot "header" here -->
        <h3>Panel</h3>
      </div>
      <div class="panel-body">
        <slot />
      </div>
    </div>
  \`
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
  .panels { display: flex; gap: 16px; flex-wrap: wrap; }
  .panel { background: #313244; border-radius: 12px; overflow: hidden; min-width: 220px; }
  .panel-header { background: #45475a; padding: 12px 16px; }
  .panel-header h3 { margin: 0; color: #89b4fa; }
  .panel-body { padding: 16px; color: #a6adc8; line-height: 1.6; }
</style>
</head>
<body>
<div id="app">
  <div class="panels">
    <Panel>
      <template #header><h3>About Vue</h3></template>
      <p>Vue is a progressive framework for building user interfaces.</p>
    </Panel>
    <Panel>
      <template #header><h3>Composition API</h3></template>
      <p>The Composition API makes logic reuse easy and scalable.</p>
    </Panel>
  </div>
</div>

<script type="module">
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({ setup() { return {} } })

app.component('Panel', {
  template: \`
    <div class="panel">
      <div class="panel-header">
        <slot name="header" />
      </div>
      <div class="panel-body">
        <slot />
      </div>
    </div>
  \`
})

app.mount('#app')
<\/script>
</body>
</html>`,
    hints: [
      'In the Panel template, replace the hardcoded `<h3>Panel</h3>` with `<slot name="header" />`.',
      'In each `<Panel>` usage, add `<template #header><h3>Your Title</h3></template>` as the first child.',
      '`#header` is shorthand for `v-slot:header`.',
    ],
  },
]
