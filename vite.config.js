import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' lets the built site run from any folder or host
// (GitHub Pages, Netlify, Vercel) together with HashRouter.
export default defineConfig({
  plugins: [react()],
  base: './',
})
