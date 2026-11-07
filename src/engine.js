// One shared rAF loop: smoothed scroll position + mouse position.
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const ease = t => t * t * (3 - 2 * t)
const mq = q => typeof matchMedia !== 'undefined' && matchMedia(q).matches
export const reduce = mq('(prefers-reduced-motion: reduce)')
export const fine = mq('(hover:hover) and (pointer:fine)')
export const s = { y: 0, vh: 0, vw: 0, mx: 0, my: 0, cx: -100, cy: -100 }
const subs = new Set()
let on = false

function start() {
  if (on) return
  on = true
  s.y = scrollY; s.vh = innerHeight; s.vw = innerWidth
  addEventListener('resize', () => { s.vh = innerHeight; s.vw = innerWidth })
  addEventListener('mousemove', e => {
    s.cx = e.clientX; s.cy = e.clientY
    s.mx = s.cx / s.vw - .5; s.my = s.cy / s.vh - .5
  })
  const loop = () => {
    const t = scrollY
    s.y = reduce ? t : s.y + (t - s.y) * .12
    if (Math.abs(t - s.y) < .05) s.y = t
    subs.forEach(f => f(s))
    requestAnimationFrame(loop)
  }
  loop()
}

export function subscribe(fn) { start(); subs.add(fn); return () => subs.delete(fn) }

export function go(key) {
  const el = id => document.getElementById(id)
  const sc = el('scene')
  const y = {
    home: 0,
    about: sc.offsetTop + .98 * (sc.offsetHeight - s.vh),
    work: el('work').offsetTop,
    contact: el('talk').offsetTop,
  }[key] || 0
  scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
}
