
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This maps the terminal's API_KEY to process.env.API_KEY in your code
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
