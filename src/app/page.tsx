'use client'

import { useEffect, useState } from 'react'
import { BsCoin } from 'react-icons/bs'

export default function Home() {
  const [isAnimation, setIsAnimation] = useState(false)
  const [count, setCount] = useState(0)
  const [counter, setCounter] = useState(0.0)
  const [velocity, setVelocity] = useState(2000)
  const [velocity2, setVelocity2] = useState(20)

  function newGame() {
    setIsAnimation(!isAnimation)
    setCount(0)
    setCounter(0)
    setVelocity(2000)
    setVelocity2(20)
  }

  useEffect(() => {
    if (isAnimation) {
      setCount(Number(Math.floor(counter)))
    }
  }, [isAnimation, velocity, counter])

  useEffect(() => {
    let interval: any

    if (isAnimation) {
      const startValue = counter
      // eslint-disable-next-line no-loss-of-precision
      const endValue = 100000000000000000000000000000000000000000.0
      const duration = 10000000000000000000000000000000000000000000 // 7.4 segundos
      const increment = (endValue - startValue) / duration

      let currentCount: any = startValue

      interval = setInterval(() => {
        currentCount += increment

        if (currentCount >= endValue) {
          currentCount = endValue
          clearInterval(interval)
        }

        setCounter(Number(currentCount.toFixed(2)))
      }, velocity2)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isAnimation, velocity2])

  useEffect(() => {
    if (counter === 9) {
      setVelocity(1000)
      setVelocity2(10)
    }
  }, [counter])

  return (
    <div className="w-full h-screen gap-4 flex flex-col items-center justify-center">
      <div className="Container">
        {counter < 9 && (
          <div
            className={`${isAnimation && 'PATAMAR2'} cont2 text-transparent`}
          >
            <span className="floor">{isAnimation ? count : ''}</span>
          </div>
        )}

        {counter > 9 && (
          <div
            className={`${isAnimation && 'PATAMAR3'} cont2 text-transparent`}
          >
            <span className="floor">{isAnimation ? count : ''}</span>
          </div>
        )}

        <div className={`${isAnimation && 'ARROW-animation'} ARROW`} />

        <div className={`${isAnimation ? 'PATAMARONE' : 'PATAMARZERO'}`} />

        {counter > 10 ? (
          <span
            className={`absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-zinc-600 z-50 rounded-lg text-xl text-white font-bold min-w-[14%] text-center `}
          >
            {counter.toFixed(1) + ' X'}
          </span>
        ) : (
          <span
            className={`absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-zinc-600 z-50 rounded-lg text-xl text-white font-bold min-w-[14%] text-center `}
          >
            {counter + ' X'}
          </span>
        )}

        <BsCoin className={`${isAnimation && 'point-animation'} point`} />
      </div>

      <button
        className="p-4 rounded-xl bg-green-400 text-2xl font-bold text-white"
        onClick={() => newGame()}
      >
        Jogar
      </button>
    </div>
  )
}
