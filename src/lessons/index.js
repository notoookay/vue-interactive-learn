import intro from './01-intro.js'
import template from './02-template.js'
import reactivity from './03-reactivity.js'
import components from './04-components.js'
import lifecycle from './05-lifecycle.js'
import composables from './06-composables.js'

export const lessons = [
  ...intro,
  ...template,
  ...reactivity,
  ...components,
  ...lifecycle,
  ...composables,
]

export function getLessonById(id) {
  return lessons.find(l => l.id === id) ?? null
}

export function getChapters() {
  const map = new Map()
  for (const lesson of lessons) {
    if (!map.has(lesson.chapter)) {
      map.set(lesson.chapter, {
        chapter: lesson.chapter,
        title: lesson.chapterTitle,
        lessons: [],
      })
    }
    map.get(lesson.chapter).lessons.push(lesson)
  }
  return [...map.values()]
}
