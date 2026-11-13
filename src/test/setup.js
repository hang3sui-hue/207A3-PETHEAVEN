// Test setup: add jest-dom matchers and the browser APIs that jsdom does not have.
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

window.scrollTo = () => {}
window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }))
window.IntersectionObserver = class {
  constructor(cb) { this.cb = cb }
  observe() { this.cb([{ isIntersecting: true }]) }
  disconnect() {}
  unobserve() {}
}

afterEach(() => {
  cleanup()
  localStorage.clear()
})
