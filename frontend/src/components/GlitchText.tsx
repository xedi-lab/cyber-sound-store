import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&0123456789АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'

interface Props {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  scramble?: boolean
  as?: string
}

export function GlitchText({ text, className = '', tag: Tag = 'span', scramble = false }: Props) {
  const [displayed, setDisplayed] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const iterRef = useRef(0)

  useEffect(() => {
    if (!scramble) return

    const runScramble = () => {
      iterRef.current = 0
      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = setInterval(() => {
        setDisplayed(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < iterRef.current) return text[i]
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        iterRef.current += 0.5
        if (iterRef.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setDisplayed(text)
        }
      }, 30)
    }

    runScramble()
    const loop = setInterval(runScramble, 6000)
    return () => {
      clearInterval(loop)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, scramble])

  return (
    <Tag
      className={`glitch ${className}`}
      data-text={displayed}
    >
      {displayed}
    </Tag>
  )
}

interface TypewriterProps {
  lines: string[]
  className?: string
  speed?: number
  onDone?: () => void
}

export function Typewriter({ lines, className = '', speed = 40, onDone }: TypewriterProps) {
  const [output, setOutput] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true)
      onDone?.()
      return
    }

    const line = lines[currentLine]

    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setOutput(prev => {
          const next = [...prev]
          if (next.length <= currentLine) next.push('')
          next[currentLine] = line.slice(0, currentChar + 1)
          return next
        })
        setCurrentChar(c => c + 1)
      }, speed)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 120)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar, lines, speed, onDone])

  return (
    <div className={className}>
      {output.map((line, i) => (
        <div key={i} className="text-cyber-green font-mono text-sm">
          {line}
          {i === output.length - 1 && !done && (
            <span className="cursor" />
          )}
        </div>
      ))}
    </div>
  )
}
