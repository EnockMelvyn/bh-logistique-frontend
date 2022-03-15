module.exports = {
  mode: process.env.TAILWIND_MODE ? 'jit' : '',
  purge: ['./src/**/*.{ts,html}'],
  content: ["./src/app/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}