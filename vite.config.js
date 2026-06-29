import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//
// IMPORTANT pour GitHub Pages :
// Remplacez 'merci-monsieur-rhodes' par le nom EXACT de votre depot GitHub.
// Exemple : si votre repo est https://github.com/pseudo/cadeaux-rhodes,
// alors base doit valoir '/cadeaux-rhodes/'.
export default defineConfig({
  plugins: [react()],
  base: '/merci-monsieur-rhodes/',
})
