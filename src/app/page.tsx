'use client'

import { useEffect, useState } from 'react'
import { BsCoin } from 'react-icons/bs'

export default function Home() {
  const [isAnimation, setIsAnimation] = useState(false)
  const [count, setCount] = useState(0)
  const [counter, setCounter] = useState(0.0)

  function newGame() {
    setIsAnimation(!isAnimation)
    setCount(0)
    setCounter(0)
  }

  useEffect(() => {
    if (isAnimation) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isAnimation])

  useEffect(() => {
    let interval: any

    if (isAnimation) {
      const startValue = 0.0
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

        setCounter(currentCount.toFixed(2))
      }, 30)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isAnimation])

  return (
    <div className="w-full h-screen gap-4 flex flex-col items-center justify-center">
      <div className="Container">
        <div className={`${isAnimation && 'PATAMAR'} text-transparent`}>
          {isAnimation ? count : ''}
        </div>
        <div
          className={`${
            isAnimation && 'ARROW'
          } w-[20px] h-[20px] absolute bottom-[6%] left-[8%] bg-[rgb(0,128,0)]`}
        />

        <div className={`${isAnimation ? 'PATAMARONE' : 'PATAMARZERO'}`} />

        <div className={`MARKERI ${isAnimation && 'MARKERI-ANIMATION'}`} />

        <div className={`MARKERIY ${isAnimation && 'MARKERI-ANIMATIONY'}`} />

        <div className={`${isAnimation ? 'Stripes' : 'Stripes-no-animated'}`} />

        <div
          className={`${
            isAnimation ? 'Stripes-bottom' : 'Stripes-bottom-no-animated'
          }`}
        />

        <span
          className={`absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-zinc-600 z-50 rounded-lg text-xl text-white font-bold `}
        >
          {counter + ' X'}
        </span>

        <BsCoin
          className={`${
            isAnimation && 'point'
          } w-[58px] h-[58px] bg-yellow-500 rounded-full absolute bottom-[6%] left-[8%]`}
        />
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
