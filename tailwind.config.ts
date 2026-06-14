import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { cream:'#fff8ec', lavender:'#d9ccff', peach:'#ffd3bd', sky:'#bfe9ff', mint:'#c8f5dc', gold:'#f7c948' }, boxShadow:{soft:'0 18px 50px rgba(92,64,51,.12)'} } }, plugins: [] };
export default config;
