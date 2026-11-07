import { useEffect, useRef } from 'react'
import { subscribe, fine } from '../engine'

export default function Cursor() {
  const ring = useRef(), dot = useRef()
  useEffect(() => {
    if (!fine) return
    let rx = -100, ry = -100, rs = 1, hot = false
    const move = e => {
      ring.current.classList.add('on'); dot.current.classList.add('on')
      hot = !!e.target.closest('a,button,[data-hover]')
      ring.current.classList.toggle('hot', hot)
    }
    const leave = () => { ring.current.classList.remove('on'); dot.current.classList.remove('on') }
    addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    const off = subscribe(({ cx, cy }) => {
      rx += (cx - rx) * .16; ry += (cy - ry) * .16; rs += ((hot ? 1.9 : 1) - rs) * .18
      ring.current.style.transform = `translate3d(${rx - 20}px,${ry - 20}px,0) scale(${rs})`
      dot.current.style.transform = `translate3d(${cx - 3.5}px,${cy - 3.5}px,0)`
    })
    return () => { removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave); off() }
  }, [])
  return (<><div className="cur ring" ref={ring} /><div className="cur dot" ref={dot} /></>)
}
